const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});

const createTable = async() => {
    const params = {
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "S"
            },
            {
                AttributeName: "name",
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: "id",
                KeyType: "HASH"
            },
            {
                AttributeName: "name",
                KeyType: "RANGE"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
        TableClass: "STANDARD",
        TableName: "Pet"
    };

    try {
        const data = await dynamodb.createTable(params).promise();

        console.log("Table Created", data);
    }
    catch (err) {
        console.log("Error", err);
    }
}

createTable();
