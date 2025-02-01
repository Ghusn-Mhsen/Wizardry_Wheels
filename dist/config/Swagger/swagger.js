"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'Wizardry Wheels API',
            version: '1.0.0',
            description: 'API documentation for Wizardry Wheels',
        },
        servers: [
            {
                url: 'http://localhost:4000', // Change this to match your environment
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to API routes
};
// Generate Swagger documentation
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerSpec;
