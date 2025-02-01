import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import MissionLogService from "../services/mission_log.service";
import { HttpStatus } from "../utils/httpStatus";

/**
 * Controller for managing mission log operations.
 * Contains a method for retrieving all mission log entries.
 */
@injectable()
class MissionLogController {

    /**
     * Creates an instance of the MissionLogController.
     * 
     * @param {MissionLogService} missionLogService - The service that handles the business logic for mission logs.
     */
    constructor(@inject(MissionLogService) private missionLogService: MissionLogService) { }

    /**
     * Retrieves all mission log entries.
     * 
     * @param {Request} req - The request object representing the HTTP request.
     * @param {Response} res - The response object used to send the result back to the client.
     * 
     * @returns {Promise<void>} A promise that resolves when the mission logs have been retrieved and the response has been sent.
     */
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const missionLogItems = await this.missionLogService.getAllMissionLogItems();
            res.status(HttpStatus.SUCCESS.code).json({
                message: HttpStatus.SUCCESS.description,
                data: missionLogItems,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST.code).json({
                message: error || HttpStatus.BAD_REQUEST.description,
            });
        }
    }
}

export default MissionLogController;
