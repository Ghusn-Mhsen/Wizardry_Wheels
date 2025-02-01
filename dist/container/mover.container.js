"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMoverDependencies = registerMoverDependencies;
const tsyringe_1 = require("tsyringe");
const mover_repo_1 = __importDefault(require("../repositories/mover.repo"));
const mover_service_1 = __importDefault(require("../services/mover.service"));
const mover_controller_1 = __importDefault(require("../controllers/mover.controller"));
/**
 * Registers the dependencies related to movers in the container.
 * This function registers the `MoverRepo`, `MoverService`, and
 * `MoverController` as singletons in the dependency injection container,
 * ensuring that the same instance of each is used throughout the application.
 *
 * @returns {void} This function does not return anything; it only registers
 * the mover-related dependencies in the container.
 */
function registerMoverDependencies() {
    // Register MoverRepo as a singleton
    tsyringe_1.container.registerSingleton(mover_repo_1.default, mover_repo_1.default);
    // Register MoverService as a singleton
    tsyringe_1.container.registerSingleton(mover_service_1.default, mover_service_1.default);
    // Register MoverController as a singleton
    tsyringe_1.container.registerSingleton(mover_controller_1.default, mover_controller_1.default);
}
