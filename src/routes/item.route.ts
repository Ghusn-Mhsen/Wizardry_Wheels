import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import ItemController from "../controllers/item.controller";
import { ItemValidationRules } from "../validators/ItemValidator";
import { validateRequest } from "../middlewares/validationMiddleware";

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API for managing items
 */
class ItemRoutes {
    router = Router();
    ItemController: ItemController;

    constructor() {
        this.ItemController = container.resolve(ItemController);
        this.initializeRoutes();
    }

    /**
     * Initializes the routes for handling item-related requests.
     */
    initializeRoutes() {
        /**
         * @swagger
         * /api/v1/items:
         *   post:
         *     summary: Add a new item
         *     description: Adds a new item to the inventory
         *     tags: [Items]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - weight
         *             properties:
         *               name:
         *                 type: string
         *                 example: "product_2"
         *               weight:
         *                 type: number
         *                 example: 100
         *     responses:
         *       201:
         *         description: Item created successfully
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
         *                     _id:
         *                       type: string
         *                       example: "6797ce58362cfa6baa00e34c"
         *                     name:
         *                       type: string
         *                       example: "product_3"
         *                     weight:
         *                       type: number
         *                       example: 100
         *                     createdAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T18:20:08.611Z"
         *                     updatedAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-27T18:20:08.617Z"
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        this.router.post(
            "/",
            ItemValidationRules,
            validateRequest,
            (req: Request, res: Response) => this.ItemController.create(req, res)
        );

        /**
         * @swagger
         * /api/v1/items:
         *   get:
         *     summary: Retrieve all items
         *     description: Fetches all items from the inventory
         *     tags: [Items]
         *     responses:
         *       200:
         *         description: Successfully retrieved items
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
         *                       name:
         *                         type: string
         *                         example: "product_3"
         *                       weight:
         *                         type: number
         *                         example: 100
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
        this.router.get("/", (req: Request, res: Response) => this.ItemController.getAll(req, res));
    }
}

export default new ItemRoutes().router;
