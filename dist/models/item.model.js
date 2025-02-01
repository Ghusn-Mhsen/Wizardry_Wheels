"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const timestamp_1 = require("../utils/plugins/timestamp");
/**
 * Mongoose schema for the Item model.
 * Defines the structure of an Item document.
 *
 * @constant {Schema<IItem>} ItemSchema
 */
const ItemSchema = new mongoose_1.Schema({
    /**
     * The name of the item.
     * This is a required field.
     * @type {string}
     */
    name: { type: String, required: true },
    /**
     * The weight of the item.
     * This is a required field.
     * @type {number}
     */
    weight: { type: Number, required: true },
});
/**
 * Add timestamp fields (createdAt, updatedAt) to the Item schema.
 * This is done using the `addTimestamps` utility function.
 *
 * @function
 */
(0, timestamp_1.addTimestamps)(ItemSchema);
/**
 * Mongoose model for the Item collection in the database.
 * Provides methods to interact with the collection, such as saving, finding, and updating items.
 *
 * @type {Model<IItem>}
 */
const Item = (0, mongoose_1.model)("Item", ItemSchema);
exports.default = Item;
// import { addTimestamps, Timestamps } from "../utils/plugins/timestamp";
// export interface IItem extends Document {
//     name: string;
//     weight: number;
// }
// const ItemSchema = new Schema<IItem>({
//     name: { type: String, required: true },
//     weight: { type: Number, required: true },
// });
// addTimestamps<IItem & Timestamps>(ItemSchema);
// const Item = model<IItem>("Item", ItemSchema);
// export default Item;
