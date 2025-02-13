"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = initializeApp;
exports.stopServer = stopServer;
const express_1 = __importDefault(require("express"));
const db_connection_1 = __importDefault(require("./config/DB/db.connection"));
const server_1 = __importDefault(require("./server"));
const config_1 = __importDefault(require("./config/config"));
const logging_1 = __importDefault(require("./utils/handlers/logging"));
const logger = logging_1.default.getInstance("server");
let server;
/**
 * Initializes the Express application by connecting to the database and setting up the server.
 *
 * @returns {Promise<Application>} The initialized Express application.
 */
async function initializeApp() {
    // Connect to the database
    await db_connection_1.default.connect();
    const app = (0, express_1.default)();
    new server_1.default(app); // Initialize the server with the app
    return app;
}
/**
 * Starts the server after initializing the application.
 * It listens on a specified port and handles any errors during startup.
 *
 * @returns {Promise<void>} A promise indicating the server has started or failed to start.
 */
async function startServer() {
    try {
        const app = await initializeApp();
        const port = config_1.default.port ? parseInt(config_1.default.port) : 4000;
        server = app.listen(port, "0.0.0.0", () => {
            console.log(`Server running on: http://localhost:${port}`);
        }).on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                console.log("Server startup error: Address already in use");
            }
            else {
                logger.error("Error starting the server:", err);
            }
        });
    }
    catch (error) {
        logger.error("Error initializing the application:", error);
        process.exit(1); // Ensure the process exits on initialization failure
    }
}
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    console.log(reason);
});
async function stopServer() {
    if (server) {
        await new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("Server stopped successfully");
                    resolve();
                }
            });
        });
    }
}
// Start the server
startServer();
/*
-route
-controller
-service
-repository
-middleware
-validation
-error all (try-global)
-Error Handling all App
-winston
-stream morgan
-docker
-jsDoc
-swagger
-e2e
-unit test
------------------

multi environment
docker
docker swarm
microservice
logging
error handling
unit test
e2e test
swagger
JsDoc
eslint
nginx
typescript

 - I used nginx for URL redirection
 - docker-swarm for rolling updates
 - Run multiple app (Microservice App)
 - multi-environment (production - development )
 - unit test For repository layer
 - E2e test



docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml down -v
docker stack deploy -c docker-compose.yml -c docker-compose.dev.yml express-app
docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml build
docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml  up -d --build
*/
