"use strict";
exports.__esModule = true;
require("reflect-metadata");
var swagger_ui_express_1 = require("swagger-ui-express");
var swagger_1 = require("../config/Swagger/swagger");
var item_route_1 = require("./item.route");
var mover_route_1 = require("./mover.route");
var mission_log_route_1 = require("./mission_log.route");
var container_1 = require("../container");
var logging_1 = require("../utils/handlers/logging");
/**
 * Routes class sets up all API routes and handles route registration.
 * It also manages global error handling for the application.
 */
var Routes = /** @class */ (function () {
    /**
     * Initializes the Routes class by registering all dependencies
     * and setting up the routes with their respective base paths.
     * It also sets up global error handling middleware.
     *
     * @param {Application} app - Express application instance to attach routes.
     */
    function Routes(app) {
        this.logger = logging_1["default"].getInstance("routes"); // Logger for route registration
        // Register all dependencies
        container_1.registerAllDependencies();
        // Log route registration
        this.logger.info("Registering routes...");
        // Swagger and routes setup
        app.use("/api-docs", swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swagger_1["default"]));
        // Registering the routes with base path
        app.use("/api/v1/movers", mover_route_1["default"]); // Register MoversRoute under /api/v1/movers
        app.use("/api/v1/items", item_route_1["default"]); // Register ItemsRoute under /api/v1/items
        app.use("/api/v1/mission-log", mission_log_route_1["default"]); // Register missionRoute under /api/v1/mission-log
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
    Routes.prototype.errorHandler = function (err, req, res, next) {
        // Log the error with stack trace for debugging purposes
        this.logger.error("Error occurred: " + err.message, { stack: err.stack });
        // Send the error response to the client
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            details: process.env.NODE_ENV === "development" ? err.message : undefined
        });
    };
    return Routes;
}());
exports["default"] = Routes;
