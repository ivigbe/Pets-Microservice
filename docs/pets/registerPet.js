module.exports = {
    post: {
        tags: ['Pets management'],
        summary: '',
        description: '',
        parameters: [
            {
                $ref: '#/components/schemas/pet',
            },
        ],
        responses: {
            201: {
                description: 'New pet registered',
                content: {
                    'application/json': {
                        schema: {
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
            },
            400: {
                description: 'Bad request',
            },
            500: {
                description: 'Register pet error',
                schema: {
                    $ref: '#/components/schemas/error',
                },
            },
        },
    },
};