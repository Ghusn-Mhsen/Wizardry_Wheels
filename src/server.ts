import cors from "cors";
import morgan from "morgan";
import { Application, urlencoded, json } from "express";
import helmet from "helmet";
import * as fs from "fs";
import { WriteStream } from "fs";
import * as path from "path";
import errorHandler from "./middlewares/globalError";
import Routes from "./routes";
import LoggerService from "./utils/handlers/logging";
import { requestLogger } from "./middlewares/loggerMiddleware"

// Create an instance of the LoggerService to log globally
const logger = LoggerService.getInstance("global");

/**
 * Server class responsible for configuring and initializing the Express application.
 */
export default class Server {
    /**
     * Initializes the server by configuring the app and setting up routes.
     * 
     * @param {Application} app - The Express application instance.
     */
    constructor(app: Application) {
        this.config(app);
        new Routes(app); // Ensure routes are set up
    }

    /**
     * Configures the Express app by setting up various middlewares.
     * 
     * @param {Application} app - The Express application instance to configure.
     * @returns {void} This function does not return anything.
     */
    public config(app: Application): void {
        // Ensure logs directory exists
        const logsDirectory = path.join(__dirname, "../logging");


        // Create the logs directory if it doesn't exist
        if (!fs.existsSync(logsDirectory)) {
            fs.mkdirSync(logsDirectory);
        }

        // Set up the access log stream for morgan
        const accessLogStream: WriteStream = fs.createWriteStream(
            path.join(__dirname, "../logging/access.log"),
            { flags: "a" } // 'a' means append
        );

        // Use morgan to log HTTP requests to the file
        app.use(morgan("combined", { stream: accessLogStream }));

        // Use middlewares in the specified order
        app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
        app.use(json()); // Parse incoming JSON requests
        app.use(urlencoded({ extended: true })); // Parse URL-encoded data
        app.use(helmet()); // Set security-related HTTP headers
        // Apply logging middleware to log all HTTP requests
        app.use(requestLogger);

        // Set up global error handler middleware
        app.use(errorHandler);
        app.get("/", (req, res) => {
            res.send("Hello, world!");
        });

        // Log a message indicating middleware has been configured successfully
        logger.info("Middleware configured successfully.");
    }
}

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (error) => {
    logger.error("Application exiting due to uncaught exception", { error });
    process.exit(1); // Exit after logging the error
});

process.on("unhandledRejection", (reason) => {
    logger.error("Application exiting due to unhandled rejection", { reason });
    process.exit(1); // Exit after logging the rejection reason
});

process.on("beforeExit", (code) => {
    console.log(code)
    logger.debug(`Process beforeExit with code: ${code}`);
});
