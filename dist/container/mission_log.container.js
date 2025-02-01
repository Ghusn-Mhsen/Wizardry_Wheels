"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMissionLogDependencies = registerMissionLogDependencies;
const tsyringe_1 = require("tsyringe");
const mission_log_repo_1 = __importDefault(require("../repositories/mission_log.repo"));
const mission_log_service_1 = __importDefault(require("../services/mission_log.service"));
const mission_log_controller_1 = __importDefault(require("../controllers/mission_log.controller"));
/**
 * Registers the dependencies related to mission logs in the container.
 * This function registers the `MissionLogRepo`, `MissionLogService`, and
 * `MissionLogController` as singletons in the dependency injection container,
 * making them available for automatic injection throughout the application.
 *
 * @returns {void} This function does not return any value; it only registers
 * the mission log related dependencies in the container.
 */
function registerMissionLogDependencies() {
    // Register MissionLogRepo as a singleton
    tsyringe_1.container.registerSingleton(mission_log_repo_1.default, mission_log_repo_1.default);
    // Register MissionLogService as a singleton
    tsyringe_1.container.registerSingleton(mission_log_service_1.default, mission_log_service_1.default);
    // Register MissionLogController as a singleton
    tsyringe_1.container.registerSingleton(mission_log_controller_1.default, mission_log_controller_1.default);
}
