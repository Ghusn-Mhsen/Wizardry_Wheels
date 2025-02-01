import { check } from "express-validator";

/**
 * Validation rules for the item creation or update requests.
 * These rules use the `express-validator` library to validate incoming request data.
 * The rules validate the `name` and `weight` fields in the request body.
 * 
 * @constant {Array} ItemValidationRules - Array of validation rules for item-related fields.
 * 
 * @example
 *  Example of how these validation rules would be used in a route handler
 * app.post('/items', ItemValidationRules, (req, res) => {
 *    Handle the request
 * });
 */
export const ItemValidationRules = [
  /**
   * Validates that the 'name' field is not empty.
   * This field is required for the item.
   * 
   * @param {string} name - The name of the item.
   * @throws {ValidationError} - Throws an error if the name is empty.
   */
  check("name").notEmpty().withMessage("Name is required"),

  /**
   * Validates that the 'weight' field is a positive number.
   * The value must be greater than zero.
   * 
   * @param {number} weight - The weight of the item.
   * @throws {ValidationError} - Throws an error if the weight is not a positive number.
   */
  check("weight").isFloat({ gt: 0 }).withMessage("Weight must be a positive number"),
];
