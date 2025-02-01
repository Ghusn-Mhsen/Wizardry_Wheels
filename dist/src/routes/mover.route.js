"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const mover_controller_1 = __importDefault(require("../controllers/mover.controller"));
const MoverValidationRules_1 = require("../validators/MoverValidationRules");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
/**
 * MoverRoutes handles the routing for mover-related requests.
 * It defines routes for creating movers, loading items, starting and ending missions, and retrieving mission data.
 */
class MoverRoutes {
    /**
     * Initializes the MoverRoutes class, retrieves the MoverController instance,
     * and sets up the routes.
     */
    constructor() {
        this.router = (0, express_1.Router)();
        this.MoverController = tsyringe_1.container.resolve(mover_controller_1.default);
        this.initializeRoutes();
    }
    /**
     * Initializes the routes for handling mover-related requests.
     * - POST /api/movers: Create a new mover.
     * - GET /api/movers: Retrieve all movers.
     * - POST /api/movers/load: Load items into a mover.
     * - POST /api/movers/start-mission: Start a mission for a mover.
     * - POST /api/movers/end-mission: End a mission for a mover.
     * - GET /api/movers/most-completed: Get movers with the most completed missions.
     */
    initializeRoutes() {
        // Route for creating a new mover
        this.router.post("/", MoverValidationRules_1.createMoverValidationRules, // Validates the incoming request body for creating a mover
        validationMiddleware_1.validateRequest, // Middleware to handle validation errors
        (req, res) => this.MoverController.create(req, res));
        // Route for fetching all movers
        this.router.get("/", (req, res) => this.MoverController.getAll(req, res));
        // Route for loading items into a mover
        this.router.post("/load", MoverValidationRules_1.loadMoverValidationRules, // Validates the incoming request body for loading items
        validationMiddleware_1.validateRequest, // Middleware to handle validation errors
        (req, res) => this.MoverController.load(req, res));
        // Route for starting a mission for a mover
        this.router.post("/start-mission", MoverValidationRules_1.startMissionValidationRules, // Validates the incoming request body for starting a mission
        validationMiddleware_1.validateRequest, // Middleware to handle validation errors
        (req, res) => this.MoverController.startMission(req, res));
        // Route for ending a mission for a mover
        this.router.post("/end-mission", MoverValidationRules_1.endMissionValidationRules, // Validates the incoming request body for ending a mission
        validationMiddleware_1.validateRequest, // Middleware to handle validation errors
        (req, res) => this.MoverController.endMission(req, res));
        // Route for retrieving movers with the most completed missions
        this.router.get("/most-completed", (req, res) => this.MoverController.getMostCompleted(req, res));
    }
}
exports.default = new MoverRoutes().router;
