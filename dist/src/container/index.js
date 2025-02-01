"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAllDependencies = registerAllDependencies;
const item_container_1 = require("./item.container");
const mover_container_1 = require("./mover.container");
const mission_log_container_1 = require("./mission_log.container");
/**
 * Registers all dependencies required for the application.
 * This function is used to organize and call the individual dependency registration functions
 * for different modules such as items, movers, and mission logs.
 *
 * @returns {void} This function does not return any value; it simply registers dependencies.
 */
function registerAllDependencies() {
    // Register dependencies for items
    (0, item_container_1.registerItemDependencies)();
    // Register dependencies for movers
    (0, mover_container_1.registerMoverDependencies)();
    // Register dependencies for mission logs
    (0, mission_log_container_1.registerMissionLogDependencies)();
}
