import mongoose, { Schema, Document, model } from "mongoose";
import { addTimestamps, Timestamps } from "../utils/plugins/timestamp";

/**
 * Interface representing a mission log document.
 * @interface IMissionLog
 * @extends {Document}
 */
interface IMissionLog extends Document {
    /**
     * The Mover associated with the mission log.
     * @type {mongoose.Types.ObjectId}
     */
    MoverId: mongoose.Types.ObjectId;

    /**
     * The action performed by the mover in the mission.
     * Possible values: "loading", "on-mission", "unloading".
     * @type {("loading" | "on-mission" | "unloading")}
     */
    action: "loading" | "on-mission" | "unloading";

    /**
     * The timestamp when the action was performed.
     * @type {Date}
     */
    timestamp: Date;
}

/**
 * Schema for the MissionLog model.
 * @type {Schema<IMissionLog>}
 */
const missionLogSchema = new Schema<IMissionLog>({
    /**
     * Reference to the Mover model.
     * @type {mongoose.Types.ObjectId}
     * @required {true}
     */
    MoverId: { type: Schema.Types.ObjectId, ref: "Mover", required: true },

    /**
     * The action performed during the mission.
     * @enum {("loading", "on-mission", "unloading")}
     * @required {true}
     */
    action: { type: String, required: true, enum: ["loading", "on-mission", "unloading"] },
});

// Add timestamps (createdAt, updatedAt) to the schema.
addTimestamps<IMissionLog & Timestamps>(missionLogSchema);

/**
 * MissionLog model representing mission-related actions and statuses of movers.
 * @type {mongoose.Model<IMissionLog>}
 */
const MissionLog = model<IMissionLog>("MissionLog", missionLogSchema);

export default MissionLog;
