"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerItemDependencies = registerItemDependencies;
const tsyringe_1 = require("tsyringe");
const item_repo_1 = __importDefault(require("../repositories/item.repo"));
const item_service_1 = __importDefault(require("../services/item.service"));
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
/**
 * Registers the dependencies related to items in the container.
 * This function registers the `ItemRepo`, `ItemService`, and `ItemController`
 * as singletons in the dependency injection container, allowing them to be
 * automatically injected where needed throughout the application.
 *
 * @returns {void} This function does not return any value, it simply registers
 * the dependencies in the container.
 */
function registerItemDependencies() {
    // Register ItemRepo as a singleton
    tsyringe_1.container.registerSingleton(item_repo_1.default, item_repo_1.default);
    // Register ItemService as a singleton
    tsyringe_1.container.registerSingleton(item_service_1.default, item_service_1.default);
    // Register ItemController as a singleton
    tsyringe_1.container.registerSingleton(item_controller_1.default, item_controller_1.default);
}
