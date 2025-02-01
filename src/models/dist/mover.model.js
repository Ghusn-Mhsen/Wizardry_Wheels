"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var timestamp_1 = require("../utils/plugins/timestamp");
/**
 * Mongoose schema for the Mover model.
 * Defines the structure of a Mover document.
 *
 * @constant {Schema<IMover>} MoverSchema
 */
var MoverSchema = new mongoose_1.Schema({
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
    questState: { type: String, "enum": ["resting", "loading", "on-mission"], "default": "resting" },
    /**
     * An array of items assigned to the mover.
     * Each item is referenced by its ObjectId from the "Item" collection.
     * @type {Array}
     */
    items: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Item" }],
    /**
     * The number of missions the mover has completed.
     * This field is initialized to 0 by default.
     * @type {number}
     */
    missionsCompleted: { type: Number, "default": 0 }
});
/**
 * Add timestamp fields (createdAt, updatedAt) to the Mover schema.
 * This is done using the `addTimestamps` utility function.
 *
 * @function
 */
timestamp_1.addTimestamps(MoverSchema);
/**
 * Mongoose model for the Mover collection in the database.
 * Provides methods to interact with the collection, such as saving, finding, and updating movers.
 *
 * @type {Model<IMover>}
 */
var Mover = mongoose_1.model("Mover", MoverSchema);
exports["default"] = Mover;
