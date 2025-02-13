"use strict";
exports.__esModule = true;
var swagger_jsdoc_1 = require("swagger-jsdoc");
var swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Wizardry Wheels API',
            version: '1.0.0',
            description: 'API documentation for Wizardry Wheels'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server'
            },
        ]
    },
    apis: ['./src/routes/*.ts']
};
// Generate Swagger documentation
var swaggerSpec = swagger_jsdoc_1["default"](swaggerOptions);
exports["default"] = swaggerSpec;
