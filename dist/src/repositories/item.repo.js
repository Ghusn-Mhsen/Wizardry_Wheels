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
const item_model_1 = __importDefault(require("../models/item.model"));
/**
 * ItemRepo is a repository that handles data access related to Item objects.
 * It interacts with the MongoDB database using Mongoose to create and retrieve items.
 */
let ItemRepo = class ItemRepo {
    /**
     * Creates a new item in the database.
     *
     * @param {any} data - The data to be used for creating the item.
     * @returns {Promise<Document>} - The created item document.
     * @throws {Error} - Throws an error if the item could not be created.
     */
    async createItem(data) {
        try {
            const newItem = new item_model_1.default(data);
            return await newItem.save(); // Save the new item to the database
        }
        catch (error) {
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
    async getAllItems() {
        try {
            return await item_model_1.default.find(); // Retrieve all items from the database
        }
        catch (error) {
            // Log and rethrow the error to be handled by the service or controller
            throw new Error(`Failed to retrieve items: ${error.message}`);
        }
    }
};
ItemRepo = __decorate([
    (0, tsyringe_1.injectable)()
], ItemRepo);
exports.default = ItemRepo;
