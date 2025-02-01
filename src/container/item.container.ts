import { container } from "tsyringe";
import ItemRepo from "../repositories/item.repo";
import ItemService from "../services/item.service";
import ItemController from "../controllers/item.controller";

/**
 * Registers the dependencies related to items in the container.
 * This function registers the `ItemRepo`, `ItemService`, and `ItemController`
 * as singletons in the dependency injection container, allowing them to be 
 * automatically injected where needed throughout the application.
 * 
 * @returns {void} This function does not return any value, it simply registers 
 * the dependencies in the container.
 */
export function registerItemDependencies() {
    // Register ItemRepo as a singleton
    container.registerSingleton(ItemRepo, ItemRepo);

    // Register ItemService as a singleton
    container.registerSingleton(ItemService, ItemService);

    // Register ItemController as a singleton
    container.registerSingleton(ItemController, ItemController);
}
