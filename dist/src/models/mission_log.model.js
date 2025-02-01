"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
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
 *
 */
const Item = mongoose_1.default.models.Item || mongoose_1.default.model("Item", ItemSchema);
exports.default = Item;
// import mongoose, { Schema, Document } from "mongoose";
// import { addTimestamps, Timestamps } from "../utils/plugins/timestamp";
// interface IMissionLog extends Document {
//     MoverId: mongoose.Types.ObjectId;
//     action: "loading" | "on-mission" | "unloading";
//     timestamp: Date;
// }
// const missionLogSchema = new Schema<IMissionLog>({
//     MoverId: { type: Schema.Types.ObjectId, ref: "cMover", required: true },
//     action: { type: String, required: true, enum: ["loading", "on-mission", "unloading"] },
// });
// addTimestamps<IMissionLog & Timestamps>(missionLogSchema);
// const MissionLog = mongoose.model<IMissionLog>("MissionLog", missionLogSchema);
// export default MissionLog;
