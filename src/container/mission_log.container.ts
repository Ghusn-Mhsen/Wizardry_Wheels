import { container } from "tsyringe";
import MissionLogRepo from "../repositories/mission_log.repo";
import MissionLogService from "../services/mission_log.service";
import MissionLogController from "../controllers/mission_log.controller";

/**
 * Registers the dependencies related to mission logs in the container.
 * This function registers the `MissionLogRepo`, `MissionLogService`, and 
 * `MissionLogController` as singletons in the dependency injection container, 
 * making them available for automatic injection throughout the application.
 * 
 * @returns {void} This function does not return any value; it only registers 
 * the mission log related dependencies in the container.
 */
export function registerMissionLogDependencies() {
    // Register MissionLogRepo as a singleton
    container.registerSingleton(MissionLogRepo, MissionLogRepo);

    // Register MissionLogService as a singleton
    container.registerSingleton(MissionLogService, MissionLogService);

    // Register MissionLogController as a singleton
    container.registerSingleton(MissionLogController, MissionLogController);
}
