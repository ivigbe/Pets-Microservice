const { dynamoClient } = require('../connection');
const TABLE_NAME = 'Pet';

class PetRepository {

    async registerPet(petObject) {
        try {
            const params = {
                TableName: TABLE_NAME,
                Item: petObject
            };

            await dynamoClient.put(params).promise();
        } catch (err) {
            throw err;
        }
    }

    async getAllRegisteredPets() {

        const params = {
            TableName: TABLE_NAME
        };

        try {
            const listOfRegisteredPets = await dynamoClient.scan(params).promise();

            return listOfRegisteredPets.Items;

        } catch (err) {
            throw err;
        }
    }

}

module.exports = PetRepository;