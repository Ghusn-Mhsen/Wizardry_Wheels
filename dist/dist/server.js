"use strict";
exports.__esModule = true;
var cors_1 = require("cors");
var morgan_1 = require("morgan");
var express_1 = require("express");
var helmet_1 = require("helmet");
var fs = require("fs");
var path = require("path");
var globalError_1 = require("./middlewares/globalError");
var routes_1 = require("./routes");
var logging_1 = require("./utils/handlers/logging");
var loggerMiddleware_1 = require("./middlewares/loggerMiddleware");
// Create an instance of the LoggerService to log globally
var logger = logging_1["default"].getInstance("global");
/**
 * Server class responsible for configuring and initializing the Express application.
 */
var Server = /** @class */ (function () {
    /**
     * Initializes the server by configuring the app and setting up routes.
     *
     * @param {Application} app - The Express application instance.
     */
    function Server(app) {
        this.config(app);
        new routes_1["default"](app); // Ensure routes are set up
    }
    /**
     * Configures the Express app by setting up various middlewares.
     *
     * @param {Application} app - The Express application instance to configure.
     * @returns {void} This function does not return anything.
     */
    Server.prototype.config = function (app) {
        // Ensure logs directory exists
        var logsDirectory = path.join(__dirname, "../logging");
        // Create the logs directory if it doesn't exist
        if (!fs.existsSync(logsDirectory)) {
            fs.mkdirSync(logsDirectory);
        }
        // Set up the access log stream for morgan
        var accessLogStream = fs.createWriteStream(path.join(__dirname, "../logging/access.log"), { flags: "a" } // 'a' means append
        );
        // Use morgan to log HTTP requests to the file
        app.use(morgan_1["default"]("combined", { stream: accessLogStream }));
        // Use middlewares in the specified order
        app.use(cors_1["default"]()); // Enable Cross-Origin Resource Sharing (CORS)
        app.use(express_1.json()); // Parse incoming JSON requests
        app.use(express_1.urlencoded({ extended: true })); // Parse URL-encoded data
        app.use(helmet_1["default"]()); // Set security-related HTTP headers
        // Apply logging middleware to log all HTTP requests
        app.use(loggerMiddleware_1.requestLogger);
        // Set up global error handler middleware
        app.use(globalError_1["default"]);
        app.get("/", function (req, res) {
            res.send("Hello, world!");
        });
        // Log a message indicating middleware has been configured successfully
        logger.info("Middleware configured successfully.");
    };
    return Server;
}());
exports["default"] = Server;
// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", function (error) {
    logger.error("Application exiting due to uncaught exception", { error: error });
    process.exit(1); // Exit after logging the error
});
process.on("unhandledRejection", function (reason) {
    logger.error("Application exiting due to unhandled rejection", { reason: reason });
    process.exit(1); // Exit after logging the rejection reason
});
process.on("beforeExit", function (code) {
    console.log(code);
    logger.debug("Process beforeExit with code: " + code);
});
