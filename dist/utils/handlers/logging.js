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
const winston = __importStar(require("winston"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const config_1 = __importDefault(require("../../config/config"));
/**
 * LoggerService is a singleton class responsible for configuring and managing the logging system.
 * It uses Winston to log messages to both the console and a log file, depending on the configuration.
 * Each instance of LoggerService is associated with a specific route or module to log messages in separate files.
 */
class LoggerService {
    /**
     * Private constructor to initialize the LoggerService instance for a specific route.
     * It sets up the log file path and the logging format.
     *
     * @param {string} route - The route or module name for which the logger instance is being created.
     * This is used to name the log file dynamically.
     *
     * @throws {Error} - If the log directory cannot be created or if the logger fails to initialize.
     */
    constructor(route) {
        const logFilePath = config_1.default.log_file_path || "./logging";
        // Validate or create log directory
        if (!fs.existsSync(logFilePath)) {
            fs.mkdirSync(logFilePath, { recursive: true });
        }
        // Configure the winston logger
        this.logger = winston.createLogger({
            level: config_1.default.log_level || "info",
            format: winston.format.combine(winston.format.timestamp({ format: () => new Date().toLocaleString() }), winston.format.printf((info) => `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message} ${info.obj ? `| DATA: ${JSON.stringify(info.obj)}` : ""}`)),
            transports: [
                // new winston.transports.Console(),  // Uncomment if console logging is desired
                new winston.transports.File({
                    filename: path.join(logFilePath, `${route}.log`), // Log to file with dynamic name
                }),
            ],
        });
    }
    /**
     * Get or create a logger instance for a specific route or module.
     * If an instance for the given route already exists, it will return the existing one.
     *
     * @param {string} [route="app"] - The route or module name for which to fetch the logger instance.
     * If no route is specified, it defaults to "app".
     *
     * @returns {LoggerService} - The LoggerService instance for the specified route.
     */
    static getInstance(route = "app") {
        if (!LoggerService.instances[route]) {
            LoggerService.instances[route] = new LoggerService(route);
        }
        return LoggerService.instances[route];
    }
    /**
     * Log an informational message.
     *
     * @param {string} message - The message to log.
     * @param {any} [obj] - Optional additional data to include with the log message.
     */
    info(message, obj) {
        this.logger.info(message, { obj });
    }
    /**
     * Log an error message.
     *
     * @param {string} message - The error message to log.
     * @param {any} [obj] - Optional additional data to include with the log message.
     */
    error(message, obj) {
        this.logger.error(message, { obj });
    }
    /**
     * Log a debug message.
     *
     * @param {string} message - The debug message to log.
     * @param {any} [obj] - Optional additional data to include with the log message.
     */
    debug(message, obj) {
        this.logger.debug(message, { obj });
    }
}
LoggerService.instances = {};
exports.default = LoggerService;
