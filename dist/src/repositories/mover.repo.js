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
const mover_model_1 = __importDefault(require("../models/mover.model"));
/**
 * MoverRepo is a repository that handles data access related to Movers.
 * It interacts with the MongoDB database using Mongoose to perform operations like creating,
 * updating, and retrieving mover data.
 */
let MoverRepo = class MoverRepo {
    /**
     * Creates a new mover in the database.
     *
     * @param {any} data - The data for the new mover.
     * @returns {Promise<Document>} - The created mover document.
     * @throws {Error} - Throws an error if the mover could not be created.
     */
    async createMover(data) {
        try {
            const newMover = new mover_model_1.default(data);
            return await newMover.save(); // Save and return the newly created mover
        }
        catch (error) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to create mover: ${error.message}`);
        }
    }
    /**
     * Retrieves a mover by its ID.
     *
     * @param {string} MoverId - The ID of the mover to retrieve.
     * @returns {Promise<IMover | null>} - The found mover document or null if not found.
     * @throws {Error} - Throws an error if the mover could not be found.
     */
    async findMoverById(MoverId) {
        try {
            return await mover_model_1.default.findById(MoverId); // Retrieve mover by ID
        }
        catch (error) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to find mover by ID: ${error.message}`);
        }
    }
    /**
     * Updates an existing mover with new data.
     *
     * @param {string} id - The ID of the mover to update.
     * @param {any} data - The new data to update the mover with.
     * @returns {Promise<Document | null>} - The updated mover document or null if not found.
     * @throws {Error} - Throws an error if the mover could not be updated.
     */
    async updateMover(id, data) {
        try {
            return await mover_model_1.default.findByIdAndUpdate(id, data, { new: true }); // Update and return the updated mover
        }
        catch (error) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to update mover: ${error.message}`);
        }
    }
    /**
     * Retrieves movers sorted by the number of missions they have completed (in descending order).
     *
     * @returns {Promise<Document[]>} - A list of movers sorted by missionsCompleted in descending order.
     * @throws {Error} - Throws an error if the movers could not be retrieved.
     */
    async getMostCompletedMissions() {
        try {
            return await mover_model_1.default.find().sort({ missionsCompleted: -1 }); // Sort by missionsCompleted in descending order
        }
        catch (error) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to retrieve most completed missions: ${error.message}`);
        }
    }
    /**
     * Retrieves all movers from the database and populates their items.
     *
     * @returns {Promise<Document[]>} - A list of all movers with populated items.
     * @throws {Error} - Throws an error if the movers could not be retrieved.
     */
    async getAllMovers() {
        try {
            return await mover_model_1.default.find().populate("items"); // Populate the 'items' field for each mover
        }
        catch (error) {
            console.error("Failed to retrieve all movers:", error);
            return []; // Return an empty array in case of failure
        }
    }
};
MoverRepo = __decorate([
    (0, tsyringe_1.injectable)()
], MoverRepo);
exports.default = MoverRepo;
