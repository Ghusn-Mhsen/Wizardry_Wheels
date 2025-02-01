"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = require("express");
const helmet_1 = __importDefault(require("helmet"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const globalError_1 = __importDefault(require("./middlewares/globalError"));
const routes_1 = __importDefault(require("./routes"));
const logging_1 = __importDefault(require("./utils/handlers/logging"));
const loggerMiddleware_1 = require("./middlewares/loggerMiddleware");
// Create an instance of the LoggerService to log globally
const logger = logging_1.default.getInstance("global");
/**
 * Server class responsible for configuring and initializing the Express application.
 */
class Server {
    /**
     * Initializes the server by configuring the app and setting up routes.
     *
     * @param {Application} app - The Express application instance.
     */
    constructor(app) {
        this.config(app);
        new routes_1.default(app); // Ensure routes are set up
    }
    /**
     * Configures the Express app by setting up various middlewares.
     *
     * @param {Application} app - The Express application instance to configure.
     * @returns {void} This function does not return anything.
     */
    config(app) {
        // Ensure logs directory exists
        const logsDirectory = path.join(__dirname, "../logging");
        // Create the logs directory if it doesn't exist
        if (!fs.existsSync(logsDirectory)) {
            fs.mkdirSync(logsDirectory);
        }
        // Set up the access log stream for morgan
        const accessLogStream = fs.createWriteStream(path.join(__dirname, "../logging/access.log"), { flags: "a" } // 'a' means append
        );
        // Use morgan to log HTTP requests to the file
        app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
        // Use middlewares in the specified order
        app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing (CORS)
        app.use((0, express_1.json)()); // Parse incoming JSON requests
        app.use((0, express_1.urlencoded)({ extended: true })); // Parse URL-encoded data
        app.use((0, helmet_1.default)()); // Set security-related HTTP headers
        // Apply logging middleware to log all HTTP requests
        app.use(loggerMiddleware_1.requestLogger);
        // Set up global error handler middleware
        app.use(globalError_1.default);
        app.get("/", (req, res) => {
            res.send("Hello, world!");
        });
        // Log a message indicating middleware has been configured successfully
        logger.info("Middleware configured successfully.");
    }
}
exports.default = Server;
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
    console.log(code);
    logger.debug(`Process beforeExit with code: ${code}`);
});
