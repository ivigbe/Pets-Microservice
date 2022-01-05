module.exports = {
    get: {
        tags: ['Pets management'],
        summary: '',
        description: '',
        parameters: [],
        responses: {
            200: {
                description: 'Pets list query successful',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
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
                            }
                        }
                    }
                }
            },
            400: {
                description: 'Bad request',
            },
            500: {
                description: 'Pets list error',
            },
        },
    },
};