import { Schema, Document, model } from "mongoose";
import { addTimestamps, Timestamps } from "../utils/plugins/timestamp";

/**
 * Interface representing an Item document in MongoDB.
 * It extends Mongoose's Document to include MongoDB-specific properties like `_id`.
 * 
 * @interface IItem
 */
export interface IItem extends Document {
    /**
     * The name of the item.
     * @type {string}
     */
    name: string;

    /**
     * The weight of the item.
     * @type {number}
     */
    weight: number;
}

/**
 * Mongoose schema for the Item model.
 * Defines the structure of an Item document.
 * 
 * @constant {Schema<IItem>} ItemSchema
 */
const ItemSchema = new Schema<IItem>({
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
addTimestamps<IItem & Timestamps>(ItemSchema);

/**
 * Mongoose model for the Item collection in the database.
 * Provides methods to interact with the collection, such as saving, finding, and updating items.
 * 
 * @type {Model<IItem>}
 */
const Item = model<IItem>("Item", ItemSchema);

export default Item;



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