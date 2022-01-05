const { KPIManager, KPIForPets, PetRepository } = require("../database");
const { v4: uuidv4 } = require('uuid');
const { APIError, ValidationError } = require('../utils/appErrors');

class PetService {

    constructor() {
        this.repository = new PetRepository();
        this.kpiManager = new KPIManager();
        this.genres = ['F', 'M'];
    }

    async registerPet(petObject) {

        const { name, genre } = petObject;

        try {

            await this.validatePet(name, genre);

            petObject.id = uuidv4();

            const newPet = await this.repository.registerPet(petObject);

            return newPet;

        } catch (err) {
            throw new APIError('There was an error while trying to register the new pet', err)
        }
    }

    async validatePet(name, genre) {
        const existingPet = await this.repository.findPetByName({ name });

        if (existingPet)
            throw new ValidationError('Pet already exist');

        if (!this.genres.includes(genre))
            throw new ValidationError('Invalid Genre');
    }

    async getAllRegisteredPets() {

        try {
            const allPets = await this.repository.getAllRegisteredPets();

            return allPets;

        } catch (err) {
            throw new APIError('There was an error while trying to get all registered pets', err)
        }
    }

    async getPetsKPI() {

        try {
            const kpiForPets = new KPIForPets();
            this.kpiManager.setKPIToManage(kpiForPets);

            const pets = await this.repository.getAllRegisteredPets();

            const petsKPI = await this.kpiManager.calculateKPI(pets);
            
            return petsKPI;

        } catch (err) {
            throw new APIError('There was an error while trying to get KPI for pets', err)
        }
    }
}

module.exports = PetService;