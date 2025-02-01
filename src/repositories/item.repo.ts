import { injectable } from "tsyringe";
import Item from "../models/item.model";
import { Document } from "mongoose";

/**
 * ItemRepo is a repository that handles data access related to Item objects.
 * It interacts with the MongoDB database using Mongoose to create and retrieve items.
 */
@injectable()
class ItemRepo {

    /**
     * Creates a new item in the database.
     * 
     * @param {any} data - The data to be used for creating the item.
     * @returns {Promise<Document>} - The created item document.
     * @throws {Error} - Throws an error if the item could not be created.
     */
    async createItem(data: any): Promise<Document> {
        try {
            const newItem = new Item(data);
            return await newItem.save(); // Save the new item to the database
        } catch (error: any) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to create item: ${error.message}`);
        }
    }

    /**
     * Retrieves all items from the database.
     * 
     * @returns {Promise<Document[]>} - A list of all items in the database.
     * @throws {Error} - Throws an error if the items could not be retrieved.
     */
    async getAllItems(): Promise<Document[]> {
        try {
            return await Item.find(); // Retrieve all items from the database
        } catch (error: any) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to retrieve items: ${error.message}`);
        }
    }
}

export default ItemRepo;
