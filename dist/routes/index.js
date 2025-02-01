"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../config/Swagger/swagger"));
const item_route_1 = __importDefault(require("./item.route"));
const mover_route_1 = __importDefault(require("./mover.route"));
const mission_log_route_1 = __importDefault(require("./mission_log.route"));
const container_1 = require("../container");
const logging_1 = __importDefault(require("../utils/handlers/logging"));
/**
 * Routes class sets up all API routes and handles route registration.
 * It also manages global error handling for the application.
 */
class Routes {
    /**
     * Initializes the Routes class by registering all dependencies
     * and setting up the routes with their respective base paths.
     * It also sets up global error handling middleware.
     *
     * @param {Application} app - Express application instance to attach routes.
     */
    constructor(app) {
        this.logger = logging_1.default.getInstance("routes"); // Logger for route registration
        // Register all dependencies
        (0, container_1.registerAllDependencies)();
        // Log route registration
        this.logger.info("Registering routes...");
        // Swagger and routes setup
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
        // Registering the routes with base path
        app.use("/api/v1/movers", mover_route_1.default); // Register MoversRoute under /api/v1/movers
        app.use("/api/v1/items", item_route_1.default); // Register ItemsRoute under /api/v1/items
        app.use("/api/v1/mission-log", mission_log_route_1.default); // Register missionRoute under /api/v1/mission-log
        // Global error handling middleware
        app.use(this.errorHandler);
    }
    /**
     * Global error handler for unhandled errors in the app.
     * Logs the error details and sends a response to the client with the error message.
     *
     * @param {any} err - The error object that was thrown.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @param {NextFunction} next - The next middleware function in the stack.
     */
    errorHandler(err, req, res, next) {
        // Log the error with stack trace for debugging purposes
        this.logger.error(`Error occurred: ${err.message}`, { stack: err.stack });
        // Send the error response to the client
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            details: process.env.NODE_ENV === "development" ? err.message : undefined
        });
    }
}
exports.default = Routes;
