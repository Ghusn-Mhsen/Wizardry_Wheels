import { container } from "tsyringe";
import MoverRepo from "../repositories/mover.repo";
import MoverService from "../services/mover.service";
import MoverController from "../controllers/mover.controller";

/**
 * Registers the dependencies related to movers in the container.
 * This function registers the `MoverRepo`, `MoverService`, and 
 * `MoverController` as singletons in the dependency injection container, 
 * ensuring that the same instance of each is used throughout the application.
 * 
 * @returns {void} This function does not return anything; it only registers 
 * the mover-related dependencies in the container.
 */
export function registerMoverDependencies() {
    // Register MoverRepo as a singleton
    container.registerSingleton(MoverRepo, MoverRepo);

    // Register MoverService as a singleton
    container.registerSingleton(MoverService, MoverService);

    // Register MoverController as a singleton
    container.registerSingleton(MoverController, MoverController);
}
