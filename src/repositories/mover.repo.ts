import { injectable } from "tsyringe";
import Mover from "../models/mover.model";
import { Document } from "mongoose";
import { IMover } from "../models/mover.model";

/**
 * MoverRepo is a repository that handles data access related to Movers.
 * It interacts with the MongoDB database using Mongoose to perform operations like creating,
 * updating, and retrieving mover data.
 */
@injectable()
class MoverRepo {

    /**
     * Creates a new mover in the database.
     * 
     * @param {any} data - The data for the new mover.
     * @returns {Promise<Document>} - The created mover document.
     * @throws {Error} - Throws an error if the mover could not be created.
     */
    async createMover(data: any): Promise<Document> {
        try {
            const newMover = new Mover(data);
            return await newMover.save(); // Save and return the newly created mover
        } catch (error: any) {
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
    async findMoverById(MoverId: string): Promise<IMover | null> {
        try {
            return await Mover.findById(MoverId); // Retrieve mover by ID
        } catch (error: any) {
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
    async updateMover(id: string, data: any): Promise<Document | null> {
        try {
            return await Mover.findByIdAndUpdate(id, data, { new: true }); // Update and return the updated mover
        } catch (error: any) {
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
    async getMostCompletedMissions(): Promise<Document[]> {
        try {
            return await Mover.find().sort({ missionsCompleted: -1 }); // Sort by missionsCompleted in descending order
        } catch (error: any) {
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
    async getAllMovers(): Promise<Document[]> {
        try {
            return await Mover.find().populate("items"); // Populate the 'items' field for each mover
        } catch (error: any) {
            console.error("Failed to retrieve all movers:", error);
            return []; // Return an empty array in case of failure
        }
    }
}

export default MoverRepo;
