import { Document, Schema, model } from "mongoose";
import { addTimestamps, Timestamps } from "../utils/plugins/timestamp";

/**
 * Interface representing a Mover document in MongoDB.
 * It extends Mongoose's Document to include MongoDB-specific properties like `_id`.
 * 
 * @interface IMover
 */
export interface IMover extends Document {
    /**
     * The weight limit of the mover.
     * This indicates the maximum weight the mover can carry.
     * @type {number}
     */
    weightLimit: number;

    /**
     * The current state of the mover.
     * It can be one of three states: "unloading", "loading", or "on-mission".
     * @type {"resting" | "loading" | "on-mission"}
     */
    questState: "resting" | "loading" | "on-mission";

    /**
     * An array of items assigned to the mover.
     * Items are referenced by their ObjectId and are related to the Item model.
     * @type {Document[]}
     */
    items: Document[];

    /**
     * The number of missions completed by the mover.
     * This field tracks the number of missions the mover has successfully finished.
     * @type {number}
     */
    missionsCompleted: number;
}

/**
 * Mongoose schema for the Mover model.
 * Defines the structure of a Mover document.
 * 
 * @constant {Schema<IMover>} MoverSchema
 */
const MoverSchema = new Schema<IMover>({
    /**
     * The weight limit of the mover.
     * This is a required field.
     * @type {number}
     */
    weightLimit: { type: Number, required: true },

    /**
     * The current state of the mover.
     * Possible values: "resting", "loading", or "on-mission".
     * Default value is "resting".
     * @type {"resting" | "loading" | "on-mission"}
     */
    questState: { type: String, enum: ["resting", "loading", "on-mission"], default: "resting" },

    /**
     * An array of items assigned to the mover.
     * Each item is referenced by its ObjectId from the "Item" collection.
     * @type {Array}
     */
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],

    /**
     * The number of missions the mover has completed.
     * This field is initialized to 0 by default.
     * @type {number}
     */
    missionsCompleted: { type: Number, default: 0 },
});

/**
 * Add timestamp fields (createdAt, updatedAt) to the Mover schema.
 * This is done using the `addTimestamps` utility function.
 * 
 * @function
 */
addTimestamps<IMover & Timestamps>(MoverSchema);

/**
 * Mongoose model for the Mover collection in the database.
 * Provides methods to interact with the collection, such as saving, finding, and updating movers.
 * 
 * @type {Model<IMover>}
 */
const Mover = model<IMover>("Mover", MoverSchema);

export default Mover;


