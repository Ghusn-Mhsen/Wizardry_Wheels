"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const mission_log_model_1 = __importDefault(require("../models/mission_log.model"));
/**
 * MissionLogRepo is a repository that handles data access related to MissionLog entries.
 * It interacts with the MongoDB database using Mongoose to create and retrieve mission logs.
 */
let MissionLogRepo = class MissionLogRepo {
    /**
     * Creates a new mission log entry.
     *
     * @param {string} MoverId - The ID of the mover associated with the log entry.
     * @param {"loading" | "on-mission" | "unloading"} action - The action performed (e.g., loading, on-mission, unloading).
     * @returns {Promise<Document>} - The created mission log document.
     * @throws {Error} - Throws an error if the mission log could not be created.
     */
    async createLog(MoverId, action) {
        try {
            const log = new mission_log_model_1.default({
                MoverId,
                action,
                timestamp: new Date(),
            });
            return await log.save(); // Save the new log entry to the database
        }
        catch (error) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to create mission log: ${error.message}`);
        }
    }
    /**
     * Retrieves all mission log entries from the database.
     *
     * @returns {Promise<Document[]>} - A list of all mission log entries in the database.
     * @throws {Error} - Throws an error if the mission logs could not be retrieved.
     */
    async getAllItems() {
        try {
            return await mission_log_model_1.default.find(); // Retrieve all mission log entries from the database
        }
        catch (error) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to retrieve mission logs: ${error.message}`);
        }
    }
};
MissionLogRepo = __decorate([
    (0, tsyringe_1.injectable)()
], MissionLogRepo);
exports.default = MissionLogRepo;
