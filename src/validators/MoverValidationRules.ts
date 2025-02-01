import { body } from "express-validator";

/**
 * Validation rules for the `create` route. 
 * These rules validate the incoming request body for creating a mover.
 * 
 * @constant {Array} createMoverValidationRules - Array of validation rules for the `create` route.
 * 
 * @example
 *    Example usage in a route handler:
 * app.post('/movers/create', createMoverValidationRules, (req, res) => {
 *    Handle the request
 * });
 */
export const createMoverValidationRules = [
  /**
   * Validates that the `weightLimit` is a positive float number.
   * 
   * @param {number} weightLimit - The weight limit of the mover.
   * @throws {ValidationError} - Throws an error if the weight limit is not a positive float.
   */
  body("weightLimit").isFloat({ gt: 0 }).withMessage("Weight limit must be a positive number"),

  /**
   * Validates that `questState` is one of the allowed values: 'resting', 'loading', or 'on-mission'.
   * 
   * @param {string} questState - The current quest state of the mover.
   * @throws {ValidationError} - Throws an error if the `questState` is not one of the allowed values.
   */
  body("questState")
    .isIn(["resting", "loading", "on-mission"])
    .withMessage("Quest state must be one of 'resting', 'loading', or 'on-mission'"),

  /**
   * Validates that `items` is an array.
   * 
   * @param {Array} items - List of items associated with the mover.
   * @throws {ValidationError} - Throws an error if `items` is not an array.
   */
  body("items").isArray().withMessage("Items should be an array"),

  /**
   * Validates that `missionsCompleted` is a non-negative integer.
   * 
   * @param {number} missionsCompleted - The number of missions the mover has completed.
   * @throws {ValidationError} - Throws an error if `missionsCompleted` is not a non-negative integer.
   */
  body("missionsCompleted").isInt({ min: 0 }).withMessage("Missions completed must be a non-negative integer"),
];

/**
 * Validation rules for the `load` route.
 * These rules validate the incoming request body for loading items onto a mover.
 * 
 * @constant {Array} loadMoverValidationRules - Array of validation rules for the `load` route.
 */
export const loadMoverValidationRules = [
  /**
   * Validates that `MoverId` is a non-empty string.
   * 
   * @param {string} MoverId - The ID of the mover.
   * @throws {ValidationError} - Throws an error if the `MoverId` is not a valid string.
   */
  body("MoverId").isString().notEmpty().withMessage("Mover ID is required"),

  /**
   * Validates that `itemIds` is an array where each item ID is a string.
   * 
   * @param {Array} itemIds - List of item IDs to be loaded onto the mover.
   * @throws {ValidationError} - Throws an error if `itemIds` is not an array or if any ID is not a string.
   */
  body("itemIds")
    .isArray()
    .withMessage("Item IDs should be an array")
    .custom((value) => value.every((id: string) => typeof id === "string"))
    .withMessage("Each Item ID should be a string"),
];

/**
 * Validation rules for the `startMission` route.
 * These rules validate the incoming request body to start a mission for the mover.
 * 
 * @constant {Array} startMissionValidationRules - Array of validation rules for the `startMission` route.
 */
export const startMissionValidationRules = [
  /**
   * Validates that `MoverId` is a non-empty string.
   * 
   * @param {string} MoverId - The ID of the mover starting the mission.
   * @throws {ValidationError} - Throws an error if the `MoverId` is not a valid string.
   */
  body("MoverId").isString().notEmpty().withMessage("Mover ID is required"),
];

/**
 * Validation rules for the `endMission` route.
 * These rules validate the incoming request body to end a mission for the mover.
 * 
 * @constant {Array} endMissionValidationRules - Array of validation rules for the `endMission` route.
 */
export const endMissionValidationRules = [
  /**
   * Validates that `MoverId` is a non-empty string.
   * 
   * @param {string} MoverId - The ID of the mover ending the mission.
   * @throws {ValidationError} - Throws an error if the `MoverId` is not a valid string.
   */
  body("MoverId").isString().notEmpty().withMessage("Mover ID is required"),
];
