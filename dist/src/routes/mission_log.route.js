"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const ItemValidator_1 = require("../validators/ItemValidator");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
/**
 * ItemRoutes handles the routing for item-related requests.
 * It defines the routes for creating and retrieving items.
 */
class ItemRoutes {
    /**
     * Initializes the ItemRoutes class, retrieves the ItemController instance,
     * and sets up the routes.
     */
    constructor() {
        this.router = (0, express_1.Router)();
        // Retrieve the controller instance from tsyringe
        this.ItemController = tsyringe_1.container.resolve(item_controller_1.default);
        this.initializeRoutes();
    }
    /**
     * Initializes the routes for handling item-related requests.
     * POST /api/items: Create a new item.
     * GET /api/items: Retrieve all items.
     */
    initializeRoutes() {
        this.router.post("/", ItemValidator_1.ItemValidationRules, // Validates the incoming request body
        validationMiddleware_1.validateRequest, // Middleware to handle validation errors
        (req, res) => this.ItemController.create(req, res) // Route handler for item creation
        );
        this.router.get("/", (req, res) => this.ItemController.getAll(req, res)); // Route handler for fetching all items
    }
}
exports.default = new ItemRoutes().router;
