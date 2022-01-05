const registerPet = require('./pets/registerPet');
const petsKPI = require('./pets/petsKPI');
const listRegisteredPets = require('./pets/listRegisteredPets');

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Pet Shop API',
    description: 'An example of a Pet Shop API'
  },
  servers: [
    {
      url: 'http://localhost:4000/v1',
      description: 'Development server',
    }
  ],
  paths: {
    '/pets/registerPet': registerPet,
    '/pets': listRegisteredPets,
    '/pets/kpi': petsKPI,
  },
  components: {
    schemas: {
      error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      pet: {
        name: 'pet',
        in: 'body',
        description: '',
        required: false,
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          species: {
            type: 'string',
          },
          genre: {
            type: 'string',
          },
          age: {
            type: 'integer',
          },
          birthDate: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
    },
  },
};