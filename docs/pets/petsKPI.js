module.exports = {
    get: {
        tags: ['Pets management'],
        summary: '',
        description: '',
        parameters: [],
        responses: {
            200: {
                description: 'Pets KPI query successful',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                theMostNumerousSpecies: {
                                    type: 'string',
                                },
                                petAgeAverageOfSpecies: {
                                    type: 'integer',
                                },
                                standardDeviationBetweenAgesOfSameSpecies: {
                                    type: 'string',
                                },
                            },
                        }
                    }
                }
            },
            400: {
                description: 'Bad request',
            },
            500: {
                description: 'Pets KPI error',
            },
        },
    },
};