const { KPIManager, KPIForPets, PetRepository } = require("../database");
const ValidationError = require('../utils/validationError');
const { v4: uuidv4 } = require('uuid');

class PetService {

    constructor() {
        this.repository = new PetRepository();
        this.kpiManager = new KPIManager();
        this.genres = ['F', 'M'];
    }

    async registerPet(petObject) {

        try {

            await this._validatePet(petObject);

            petObject.id = uuidv4();
            petObject.birthDate = new Date(petObject.birthDate).toISOString();

            const newPet = await this.repository.registerPet(petObject);

            return newPet;

        } catch (err) {
            throw err;
        }
    }

    async _validatePet(petObject) {
        if ((new Date(petObject.birthDate) === "Invalid Date") || isNaN(new Date(petObject.birthDate)))
            throw new ValidationError('Invalid birth date');

        if (!this.genres.includes(petObject.genre))
            throw new ValidationError('Invalid genre');

        if (isNaN(petObject.age) || !(Number.isInteger(petObject.age) && petObject.age > 0))
            throw new ValidationError('Invalid age');
    }

    async getAllRegisteredPets() {

        try {
            const allPets = await this.repository.getAllRegisteredPets();

            return allPets;

        } catch (err) {
            throw err;
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
            throw err;
        }
    }
}

module.exports = PetService;