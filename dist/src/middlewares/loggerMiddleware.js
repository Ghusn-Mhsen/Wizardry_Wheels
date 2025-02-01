"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const logging_1 = __importDefault(require("../utils/handlers/logging"));
// Initialize logger instance for request logging
const logger = logging_1.default.getInstance("requests");
/**
 * Middleware function that logs the details of each HTTP request.
 * Logs information such as HTTP method, URL, status code, headers, parameters, query parameters, and request body.
 * The log is generated after the response is sent (on the "finish" event).
 *
 * @param {Request} req - The Express request object, representing the HTTP request.
 * @param {Response} res - The Express response object, used to send the HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack, allowing the request to continue.
 *
 * @returns {void} The middleware does not return anything; it simply logs the request details and continues processing.
 */
function requestLogger(req, res, next) {
    // Log the request details once the response is finished
    res.on("finish", () => {
        logger.info(`HTTP ${req.method} ${req.url} ${res.statusCode}`, {
            headers: req.headers,
            params: req.params,
            query: req.query,
            body: req.body,
        });
    });
    // Call the next middleware function
    next();
}
