"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const mission_log_controller_1 = __importDefault(require("../controllers/mission_log.controller"));
/**
 * @swagger
 * tags:
 *   name: Mission Logs
 *   description: API for retrieving mission logs
 */
class MissionLogRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.MissionLogController = tsyringe_1.container.resolve(mission_log_controller_1.default);
        this.initializeRoutes();
    }
    /**
     * Initializes the routes for handling mission log-related requests.
     */
    initializeRoutes() {
        /**
             * Initializes the routes for handling mission-log requests.
             * GET /api/v1/mission-log: Retrieve all items.
             */
        /**
         * @swagger
         * /api/v1/mission-log:
         *   get:
         *     summary: Retrieve all mission logs
         *     description: Fetches all mission logs from the system
         *     tags: [Mission Logs]
         *     responses:
         *       200:
         *         description: Successfully retrieved mission logs
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Success"
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       _id:
         *                         type: string
         *                         example: "6797ce58362cfa6baa00e34c"
         *                       moverId:
         *                         type: string
         *                         example: "6797d190cbb4dc7df9b5a6c5"
         *                       action:
         *                         type: string
         *                         example: "on-mission"
         *                       createdAt:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-27T18:20:08.611Z"
         *                       updatedAt:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-27T18:20:08.617Z"
         *                       __v:
         *                         type: number
         *                         example: 0
         */
        this.router.get("/", (req, res) => this.MissionLogController.getAll(req, res));
    }
}
exports.default = new MissionLogRoutes().router;
