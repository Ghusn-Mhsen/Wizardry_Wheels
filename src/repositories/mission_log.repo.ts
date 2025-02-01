import { injectable } from "tsyringe";
import MissionLog from "../models/mission_log.model";
import { Document } from "mongoose";

/**
 * MissionLogRepo is a repository that handles data access related to MissionLog entries.
 * It interacts with the MongoDB database using Mongoose to create and retrieve mission logs.
 */
@injectable()
class MissionLogRepo {

    /**
     * Creates a new mission log entry.
     * 
     * @param {string} MoverId - The ID of the mover associated with the log entry.
     * @param {"loading" | "on-mission" | "unloading"} action - The action performed (e.g., loading, on-mission, unloading).
     * @returns {Promise<Document>} - The created mission log document.
     * @throws {Error} - Throws an error if the mission log could not be created.
     */
    async createLog(
        MoverId: string,
        action: "loading" | "on-mission" | "unloading"
    ): Promise<Document> {
        try {
            const log = new MissionLog({
                MoverId,
                action,
                timestamp: new Date(),
            });
            return await log.save(); // Save the new log entry to the database
        } catch (error: any) {
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
    async getAllItems(): Promise<Document[]> {
        try {
            return await MissionLog.find(); // Retrieve all mission log entries from the database
        } catch (error: any) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to retrieve mission logs: ${error.message}`);
        }
    }
}

export default MissionLogRepo;
