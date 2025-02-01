import { injectable, inject } from "tsyringe";
import MissionLogRepo from "../repositories/mission_log.repo";

/**
 * MissionLogService handles the business logic related to mission logs.
 * It interacts with the MissionLogRepo to perform operations on mission log data.
 */
@injectable()
class MissionLogService {

    /**
     * @param {MissionLogRepo} missionLogRepo - An instance of the MissionLogRepo class used to interact with the mission log data.
     */
    constructor(@inject(MissionLogRepo) private missionLogRepo: MissionLogRepo) { }

    /**
     * Retrieves all mission log items from the repository.
     * 
     * @returns {Promise<any[]>} A list of all mission log items.
     */
    async getAllMissionLogItems(): Promise<any[]> {
        return this.missionLogRepo.getAllItems();
    }
}

export default MissionLogService;
