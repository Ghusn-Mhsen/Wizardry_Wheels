import * as winston from "winston";
import * as fs from "fs";
import * as path from "path";
import config from "../../config/config";

/**
 * LoggerService is a singleton class responsible for configuring and managing the logging system.
 * It uses Winston to log messages to both the console and a log file, depending on the configuration.
 * Each instance of LoggerService is associated with a specific route or module to log messages in separate files.
 */
class LoggerService {
    private logger: winston.Logger;
    private static instances: { [key: string]: LoggerService } = {};

    /**
     * Private constructor to initialize the LoggerService instance for a specific route.
     * It sets up the log file path and the logging format.
     * 
     * @param {string} route - The route or module name for which the logger instance is being created.
     * This is used to name the log file dynamically.
     * 
     * @throws {Error} - If the log directory cannot be created or if the logger fails to initialize.
     */
    private constructor(route: string) {
        const logFilePath = config.log_file_path || "./logging";

        // Validate or create log directory
        if (!fs.existsSync(logFilePath)) {
            fs.mkdirSync(logFilePath, { recursive: true });
        }

        // Configure the winston logger
        this.logger = winston.createLogger({
            level: config.log_level || "info",
            format: winston.format.combine(
                winston.format.timestamp({ format: () => new Date().toLocaleString() }),
                winston.format.printf((info) =>
                    `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message} ${info.obj ? `| DATA: ${JSON.stringify(info.obj)}` : ""}`
                )
            ),
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
    public static getInstance(route: string = "app"): LoggerService {
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
    public info(message: string, obj?: any): void {
        this.logger.info(message, { obj });
    }

    /**
     * Log an error message.
     * 
     * @param {string} message - The error message to log.
     * @param {any} [obj] - Optional additional data to include with the log message.
     */
    public error(message: string, obj?: any): void {
        this.logger.error(message, { obj });
    }

    /**
     * Log a debug message.
     * 
     * @param {string} message - The debug message to log.
     * @param {any} [obj] - Optional additional data to include with the log message.
     */
    public debug(message: string, obj?: any): void {
        this.logger.debug(message, { obj });
    }
}

export default LoggerService;
