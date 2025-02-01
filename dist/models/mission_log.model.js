"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const timestamp_1 = require("../utils/plugins/timestamp");
/**
 * Schema for the MissionLog model.
 * @type {Schema<IMissionLog>}
 */
const missionLogSchema = new mongoose_1.Schema({
    /**
     * Reference to the Mover model.
     * @type {mongoose.Types.ObjectId}
     * @required {true}
     */
    MoverId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Mover", required: true },
    /**
     * The action performed during the mission.
     * @enum {("loading", "on-mission", "unloading")}
     * @required {true}
     */
    action: { type: String, required: true, enum: ["loading", "on-mission", "unloading"] },
});
// Add timestamps (createdAt, updatedAt) to the schema.
(0, timestamp_1.addTimestamps)(missionLogSchema);
/**
 * MissionLog model representing mission-related actions and statuses of movers.
 * @type {mongoose.Model<IMissionLog>}
 */
const MissionLog = (0, mongoose_1.model)("MissionLog", missionLogSchema);
exports.default = MissionLog;
