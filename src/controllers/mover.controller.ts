import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import MoverService from "../services/mover.service";
import { HttpStatus } from "../utils/httpStatus";

/**
 * Controller for managing mover-related operations.
 * Contains methods for creating, loading, starting, ending missions, and fetching mover data.
 */
@injectable()
class MoverController {

    /**
     * Creates an instance of the MoverController.
     * 
     * @param {MoverService} MoverService - The service that handles the business logic for movers.
     */
    constructor(
        @inject(MoverService) private MoverService: MoverService
    ) { }

    /**
     * Handles the creation of a new mover.
     * 
     * @param {Request} req - The request object containing the mover data in the body.
     * @param {Response} res - The response object used to send the result back to the client.
     * 
     * @returns {Promise<void>} A promise that resolves when the mover has been created.
     */
    async create(req: Request, res: Response): Promise<void> {
        try {
            const Mover = await this.MoverService.createMover(req.body);
            res.status(HttpStatus.Created.code).json({
                message: HttpStatus.Created.description,
                data: Mover,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST.code).json({
                message: error || HttpStatus.BAD_REQUEST.description,
            });
        }
    }

    /**
     * Handles loading items into a mover.
     * 
     * @param {Request} req - The request object containing the mover ID and item IDs to load.
     * @param {Response} res - The response object used to send the result back to the client.
     * 
     * @returns {Promise<void>} A promise that resolves when the mover has been updated with loaded items.
     */
    async load(req: Request, res: Response): Promise<void> {
        try {
            const { MoverId, itemIds } = req.body;
            const updatedMover = await this.MoverService.loadItems(MoverId, itemIds);
            res.status(HttpStatus.SUCCESS.code).json({
                message: HttpStatus.SUCCESS.description,
                data: updatedMover,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST.code).json({
                message: error || HttpStatus.BAD_REQUEST.description,
            });
        }
    }

    /**
     * Handles starting a mission for a mover.
     * 
     * @param {Request} req - The request object containing the mover ID.
     * @param {Response} res - The response object used to send the result back to the client.
     * 
     * @returns {Promise<void>} A promise that resolves when the mission has been started for the mover.
     */
    async startMission(req: Request, res: Response): Promise<void> {
        try {
            const { MoverId } = req.body;
            const updatedMover = await this.MoverService.startMission(MoverId);
            res.status(HttpStatus.SUCCESS.code).json({
                message: HttpStatus.SUCCESS.description,
                data: updatedMover,
            });
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST.code).json({
                message: error.message || HttpStatus.BAD_REQUEST.description,
            });
        }
    }

    /**
     * Handles ending a mission for a mover.
     * 
     * @param {Request} req - The request object containing the mover ID.
     * @param {Response} res - The response object used to send the result back to the client.
     * 
     * @returns {Promise<void>} A promise that resolves when the mission has been ended for the mover.
     */
    async endMission(req: Request, res: Response): Promise<void> {
        try {
            const { MoverId } = req.body;
            const updatedMover = await this.MoverService.endMission(MoverId);
            res.status(HttpStatus.SUCCESS.code).json({
                message: HttpStatus.SUCCESS.description,
                data: updatedMover,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST.code).json({
                message: error || HttpStatus.BAD_REQUEST.description,
            });
        }
    }

    /**
     * Handles retrieving the movers with the most completed missions.
     * 
     * @param {Request} req - The request object.
     * @param {Response} res - The response object used to send the result back to the client.
     * 
     * @returns {Promise<void>} A promise that resolves when the movers with the most completed missions have been retrieved.
     */
    async getMostCompleted(req: Request, res: Response): Promise<void> {
        try {
            const movers = await this.MoverService.getMostCompletedMissions();
            res.status(HttpStatus.SUCCESS.code).json({
                message: HttpStatus.SUCCESS.description,
                data: movers,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST.code).json({
                message: error || HttpStatus.BAD_REQUEST.description,
            });
        }
    }

    /**
     * Handles retrieving all movers.
     * 
     * @param {Request} req - The request object.
     * @param {Response} res - The response object used to send the list of movers back to the client.
     * 
     * @returns {Promise<void>} A promise that resolves when the movers have been retrieved.
     */
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const Movers = await this.MoverService.getAllItems();
            res.status(HttpStatus.SUCCESS.code).json({
                message: HttpStatus.SUCCESS.description,
                data: Movers,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST.code).json({
                message: error || HttpStatus.BAD_REQUEST.description,
            });
        }
    }
}

export default MoverController;
