const PetService = require('../services/petService');

module.exports = (app) => {

    const service = new PetService();

    app.post('/pets/registerPet', async (req, res, next) => {
        try {
            const { name, species, genre, age, birthDate } = req.body;
            const newPet = await service.registerPet({ name, species, genre, age, birthDate });

            return res.status(201).json(newPet);

        } catch (err) {
            next(err)
        }
    });

    app.get('/pets', async (req, res, next) => {

        try {
            const pets = await service.getAllRegisteredPets();

            return res.status(200).json(pets);

        } catch (err) {
            next(err)
        }
    });

    app.get('/pets/kpi', async (req, res, next) => {

        try {
            const { species } = req.body;
            const kpis = await service.getPetsKPI(species);

            return res.status(200).json(kpis);

        } catch (err) {
            next(err)
        }
    });
}