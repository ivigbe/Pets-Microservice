const express = require('express');
const cors  = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('../docs/docs');
const { pets } = require('./api');


module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

    //api
    pets(app);
}