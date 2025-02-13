import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'Wizardry Wheels API',
            version: '1.0.0',
            description: 'API documentation for Wizardry Wheels',
        },
        servers: [
            {
                url: 'http://localhost:8080', // Change this to match your environment
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to API routes
};

// Generate Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
