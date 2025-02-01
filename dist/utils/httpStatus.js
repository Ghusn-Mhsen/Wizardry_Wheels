"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = void 0;
/**
 * Object to store HTTP status codes and their descriptions.
 * This helps standardize the status codes and descriptions used throughout the application.
 */
exports.HttpStatus = {
    /**
     * Indicates that the request was successful.
     */
    SUCCESS: {
        code: 200,
        description: "Success",
    },
    /**
     * Indicates that a resource has been successfully created.
     */
    Created: {
        code: 201,
        description: "Created",
    },
    /**
     * Indicates that the server could not process the request due to client-side errors.
     */
    BAD_REQUEST: {
        code: 400,
        description: "Bad Request",
    },
    /**
     * Indicates that the requested resource could not be found.
     */
    NOT_FOUND: {
        code: 404,
        description: "Not Found",
    },
    /**
     * Indicates that the request lacks proper authentication or authorization.
     */
    UNAUTHORIZED: {
        code: 401,
        description: "Unauthorized Request",
    },
    /**
     * Indicates a generic server error due to an issue on the server side.
     */
    SERVER_ERROR: {
        code: 500,
        description: "Server Error",
    },
    /**
     * Indicates that the server is currently unable to handle the request due to temporary overloading or maintenance.
     */
    SERVICE_UNAVAILABLE: {
        code: 503,
        description: "Service Unavailable",
    },
};
