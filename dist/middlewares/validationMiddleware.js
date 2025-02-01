"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const httpStatus_1 = require("../utils/httpStatus");
/**
 * Middleware to validate incoming request data based on validation rules.
 * If validation fails, it returns a 400 Bad Request response with error details.
 * If validation passes, the next middleware or route handler is called.
 *
 * @param {Request} req - The Express request object containing the request data to validate.
 * @param {Response} res - The Express response object used to send validation error details if any.
 * @param {NextFunction} next - The next middleware function to call if validation passes.
 *
 * @returns {void} This middleware does not return anything. It either calls the next function or sends a response.
 */
const validateRequest = (req, res, next) => {
    // Retrieve validation results from express-validator
    const errors = (0, express_validator_1.validationResult)(req);
    // If there are validation errors, send a 400 Bad Request response with the error details
    if (!errors.isEmpty()) {
        res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
            message: "Validation error",
            errors: errors.array().map((error) => ({
                message: error.msg,
            })),
        });
        return;
    }
    // Proceed to the next middleware or route handler if validation passed
    next();
};
exports.validateRequest = validateRequest;
