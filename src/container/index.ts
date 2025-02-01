import { registerItemDependencies } from "./item.container";
import { registerMoverDependencies } from "./mover.container";
import { registerMissionLogDependencies } from "./mission_log.container";

/**
 * Registers all dependencies required for the application.
 * This function is used to organize and call the individual dependency registration functions
 * for different modules such as items, movers, and mission logs.
 * 
 * @returns {void} This function does not return any value; it simply registers dependencies.
 */
export function registerAllDependencies() {
    // Register dependencies for items
    registerItemDependencies();

    // Register dependencies for movers
    registerMoverDependencies();

    // Register dependencies for mission logs
    registerMissionLogDependencies();
}
