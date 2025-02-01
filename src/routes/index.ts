import "reflect-metadata";
import { Application, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/Swagger/swagger";

import ItemsRoute from "./item.route";
import MoversRoute from "./mover.route";
import missionRoute from "./mission_log.route";

import { registerAllDependencies } from "../container";
import LoggerService from "../utils/handlers/logging";

/**
 * Routes class sets up all API routes and handles route registration.
 * It also manages global error handling for the application.
 */
export default class Routes {
    private logger = LoggerService.getInstance("routes"); // Logger for route registration

    /**
     * Initializes the Routes class by registering all dependencies
     * and setting up the routes with their respective base paths.
     * It also sets up global error handling middleware.
     * 
     * @param {Application} app - Express application instance to attach routes.
     */
    constructor(app: Application) {
        // Register all dependencies
        registerAllDependencies();

        // Log route registration
        this.logger.info("Registering routes...");
        // Swagger and routes setup
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        // Registering the routes with base path
        app.use("/api/v1/movers", MoversRoute); // Register MoversRoute under /api/v1/movers
        app.use("/api/v1/items", ItemsRoute);   // Register ItemsRoute under /api/v1/items
        app.use("/api/v1/mission-log", missionRoute); // Register missionRoute under /api/v1/mission-log

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
    private errorHandler(
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
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
