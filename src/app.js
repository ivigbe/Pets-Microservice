const express = require('express');
const cors  = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('../docs/docs');
const { pets } = require('./api');


module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());

    // const swaggerOptions = {
    //     swaggerDefinition: {
    //       info: {
    //         version: "1.0.0",
    //         title: "Pets API",
    //         description: "Pets API",
    //         servers: [{
    //           url: "http://localhost:4000/v1",
    //           description: "Development server"
    //         }]
    //       }
    //     },
    //     apis: ["src/api/*.js"]
    // };
      
    // const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

    //api
    pets(app);
}