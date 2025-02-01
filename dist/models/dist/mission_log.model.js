"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var timestamp_1 = require("../utils/plugins/timestamp");
/**
 * Schema for the MissionLog model.
 * @type {Schema<IMissionLog>}
 */
var missionLogSchema = new mongoose_1.Schema({
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
    action: { type: String, required: true, "enum": ["loading", "on-mission", "unloading"] }
});
// Add timestamps (createdAt, updatedAt) to the schema.
timestamp_1.addTimestamps(missionLogSchema);
/**
 * MissionLog model representing mission-related actions and statuses of movers.
 * @type {mongoose.Model<IMissionLog>}
 */
var MissionLog = mongoose_1.model("MissionLog", missionLogSchema);
exports["default"] = MissionLog;
