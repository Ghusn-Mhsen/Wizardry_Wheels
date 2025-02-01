import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import ItemService from "../services/item.service";
import { HttpStatus } from "../utils/httpStatus";

/**
 * Controller for managing Item-related operations.
 * Contains methods for creating and retrieving items.
 */
@injectable()
export default class ItemController {

    /**
     * @param {ItemService} ItemService - The service that handles the business logic for items.
     */
    constructor(
        @inject(ItemService) private ItemService: ItemService
    ) { }

    /**
     * Handles the creation of a new item.
     * 
     * @param {Request} req - The request object containing the item data in the body.
     * @param {Response} res - The response object used to send the result back to the client.
     * 
     * @returns {Promise<void>} A promise that resolves when the item has been created.
     */
    async create(req: Request, res: Response): Promise<void> {
        try {
            const Item = await this.ItemService.createItem(req.body);
            res.status(HttpStatus.Created.code).json({
                message: HttpStatus.Created.description,
                data: Item,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST.code).json({
                message: error || HttpStatus.BAD_REQUEST.description,
            });
        }
    }

    /**
     * Handles retrieving all items.
     * 
     * @param {Request} req - The request object.
     * @param {Response} res - The response object used to send the list of items back to the client.
     * 
     * @returns {Promise<void>} A promise that resolves when the items have been retrieved.
     */
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const Items = await this.ItemService.getAllItems();
            res.status(HttpStatus.SUCCESS.code).json({
                message: HttpStatus.SUCCESS.description,
                data: Items,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST.code).json({
                message: error || HttpStatus.BAD_REQUEST.description,
            });
        }
    }
}
