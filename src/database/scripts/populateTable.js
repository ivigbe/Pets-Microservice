const { dynamoClient } = require('../connection');
const { v4: uuidv4 } = require('uuid');
const pets = require('./pets.json');

console.log("Loading pet data into DynamoDB...");

const populateTable = async () => {

    for (let pet of pets) {
        const params = {
            TableName: "Pet",
            Item: {
                "id": uuidv4(),
                "name": pet.name,
                "species": pet.species,
                "genre": pet.genre,
                "age": pet.age,
                "birthDate": pet.birthDate,
            }
        };

        try {
            await dynamoClient.put(params).promise();
            console.log("Succeeded adding a pet named: ", pet.name);
        }
        catch (err) {
            console.error(`Can't add a pet named ${pet.name}`, err);
        }
    }
}

populateTable();
