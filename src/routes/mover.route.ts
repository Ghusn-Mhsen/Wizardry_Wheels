import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import MoverController from "../controllers/mover.controller";
import {
    createMoverValidationRules,
    endMissionValidationRules,
    loadMoverValidationRules,
    startMissionValidationRules,
} from "../validators/MoverValidationRules";
import { validateRequest } from "../middlewares/validationMiddleware";



/**
 * @swagger
 * tags:
 *   name: Movers
 *   description: API for managing movers
 */
class MoverRoutes {
    router = Router();
    MoverController: MoverController;

    constructor() {
        this.MoverController = container.resolve(MoverController);
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
        /**
         * @swagger
         * /api/v1/movers:
         *   post:
         *     summary: Create a new mover
         *     description: Creates a new mover with a weight limit, quest state, items, and completed missions.
         *     tags: [Movers]   
         *     requestBody:
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               weightLimit:
         *                 type: number
         *                 example: 600
         *               questState:
         *                 type: string
         *                 example: "resting"
         *               items:
         *                 type: array
         *                 items:
         *                   type: string
         *                   example: "6796460f9f51605cfbf77f43"
         *               missionsCompleted:
         *                 type: number
         *                 example: 0
         *     responses:
         *       201:
         *         description: Created
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Created"
         *                 data:
         *                   type: object
         *                   properties:
         *                     weightLimit:
         *                       type: number
         *                       example: 600
         *                     questState:
         *                       type: string
         *                       example: "resting"
         *                     items:
         *                       type: array
         *                       items:
         *                         type: string
         *                         example: "6797ce58362cfa6baa00e34c"
         *                     missionsCompleted:
         *                       type: number
         *                       example: 0
         *                     _id:
         *                       type: string
         *                       example: "6797d190cbb4dc7df9b5a6c5"
         *                     createdAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T18:33:52.915Z"
         *                     updatedAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T18:33:52.916Z"
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        this.router.post(
            "/",
            createMoverValidationRules,
            validateRequest,
            (req: Request, res: Response) => this.MoverController.create(req, res)
        );

        /**
         * @swagger
         * /api/v1/movers/start-mission:
         *   post:
         *     summary: Start a mission for a mover
         *     description: Starts a mission for the specified mover.
         *     tags: [Movers]  
         *     requestBody:
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               MoverId:
         *                 type: string
         *                 example: "6797d190cbb4dc7df9b5a6c5"
         *     responses:
         *       200:
         *         description: Success
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Success"
         *                 data:
         *                   type: object
         *                   properties:
         *                     _id:
         *                       type: string
         *                       example: "6797d190cbb4dc7df9b5a6c5"
         *                     weightLimit:
         *                       type: number
         *                       example: 600
         *                     questState:
         *                       type: string
         *                       example: "on-mission"
         *                     items:
         *                       type: array
         *                       items:
         *                         type: string
         *                         example: "6797ce58362cfa6baa00e34c"
         *                     missionsCompleted:
         *                       type: number
         *                       example: 0
         *                     createdAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T18:33:52.915Z"
         *                     updatedAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T18:55:32.612Z"
         *                     __v:
         *                       type: number
         *                       example: 0
         *       400:
         *         description: Already on a mission
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Already on a mission."
         */

        this.router.post(
            "/start-mission",
            startMissionValidationRules,
            validateRequest,
            (req: Request, res: Response) => this.MoverController.startMission(req, res)
        );

        /**
         * @swagger
         * /api/v1/movers/load:
         *   post:
         *     summary: Load items into a mover
         *     description: Loads specified items into the mover for transport.
         *     tags: [Movers]  
         *     requestBody:
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               MoverId:
         *                 type: string
         *                 example: "6797d190cbb4dc7df9b5a6c5"
         *               itemIds:
         *                 type: array
         *                 items:
         *                   type: string
         *                   example: "6797d164cbb4dc7df9b5a6c3"
         *     responses:
         *       200:
         *         description: Success
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Success"
         *                 data:
         *                   type: object
         *                   properties:
         *                     _id:
         *                       type: string
         *                       example: "6797d190cbb4dc7df9b5a6c5"
         *                     weightLimit:
         *                       type: number
         *                       example: 600
         *                     questState:
         *                       type: string
         *                       example: "loading"
         *                     items:
         *                       type: array
         *                       items:
         *                         type: string
         *                         example: "6797ce58362cfa6baa00e34c"
         *                     missionsCompleted:
         *                       type: number
         *                       example: 0
         *                     createdAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T18:33:52.915Z"
         *                     updatedAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T19:02:28.337Z"
         *                     __v:
         *                       type: number
         *                       example: 1
         */

        this.router.post(
            "/load",
            loadMoverValidationRules,
            validateRequest,
            (req: Request, res: Response) => this.MoverController.load(req, res)
        );

        /**
         * @swagger
         * /api/v1/movers/end-mission:
         *   post:
         *     summary: End a mission for a mover
         *     description: Ends the mission for the specified mover and updates its state.
         *     tags: [Movers]  
         *     requestBody:
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               MoverId:
         *                 type: string
         *                 example: "6797d190cbb4dc7df9b5a6c5"
         *     responses:
         *       200:
         *         description: Success
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Success"
         *                 data:
         *                   type: object
         *                   properties:
         *                     _id:
         *                       type: string
         *                       example: "6797d190cbb4dc7df9b5a6c5"
         *                     weightLimit:
         *                       type: number
         *                       example: 600
         *                     questState:
         *                       type: string
         *                       example: "resting"
         *                     items:
         *                       type: array
         *                       items:
         *                         type: string
         *                         example: "6797d164cbb4dc7df9b5a6c3"
         *                     missionsCompleted:
         *                       type: number
         *                       example: 1
         *                     createdAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T18:33:52.915Z"
         *                     updatedAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T19:03:41.169Z"
         *                     __v:
         *                       type: number
         *                       example: 2
         */

        this.router.post(
            "/end-mission",
            endMissionValidationRules,
            validateRequest,
            (req: Request, res: Response) => this.MoverController.endMission(req, res)
        );

        /**
         * @swagger
         * /api/v1/movers:
         *   get:
         *     summary: Retrieve all movers
         *     description: Returns a list of all movers.
         *     tags: [Movers]  
         *     responses:
         *       200:
         *         description: Success
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
         *                         example: "6797d190cbb4dc7df9b5a6c5"
         *                       weightLimit:
         *                         type: number
         *                         example: 600
         *                       questState:
         *                         type: string
         *                         example: "resting"
         *                       items:
         *                         type: array
         *                         items:
         *                           type: string
         *                           example: "6797d164cbb4dc7df9b5a6c3"
         *                       missionsCompleted:
         *                         type: number
         *                         example: 1
         *                       createdAt:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-27T18:33:52.915Z"
         *                       updatedAt:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-27T19:03:41.169Z"
         *                       __v:
         *                         type: number
         *                         example: 2
         */

        this.router.get("/", (req: Request, res: Response) => this.MoverController.getAll(req, res));

        /**
         * @swagger
         * /api/v1/movers/most-completed:
         *   get:
         *     summary: Get movers with the most completed missions
         *     description: Returns a list of movers sorted by the number of completed missions.
         *     tags: [Movers]  
         *     responses:
         *       200:
         *         description: Success
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
         *                         example: "6797d190cbb4dc7df9b5a6c5"
         *                       weightLimit:
         *                         type: number
         *                         example: 600
         *                       questState:
         *                         type: string
         *                         example: "resting"
         *                       items:
         *                         type: array
         *                         items:
         *                           type: string
         *                           example: "6797d164cbb4dc7df9b5a6c3"
         *                       missionsCompleted:
         *                         type: number
         *                         example: 1
         *                       createdAt:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-27T18:33:52.915Z"
         *                       updatedAt:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-27T19:03:41.169Z"
         *                       __v:
         *                         type: number
         *                         example: 2
         */

        this.router.get("/most-completed", (req: Request, res: Response) => this.MoverController.getMostCompleted(req, res));
    }
}

export default new MoverRoutes().router;
