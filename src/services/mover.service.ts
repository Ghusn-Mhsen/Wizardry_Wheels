import { injectable, inject } from "tsyringe";
import MoverRepo from "../repositories/mover.repo";
import Item from "../models/item.model";
import MissionLogRepo from "../repositories/mission_log.repo"; // Assuming a mission log repository
import LoggerService from "../utils/handlers/logging";

@injectable()
class MoverService {

    private logger = LoggerService.getInstance("mover");  // Logger for this service

    constructor(
        @inject(MoverRepo) private MoverRepo: MoverRepo,
        @inject(MissionLogRepo) private missionLogRepo: MissionLogRepo
    ) { }

    /**
     * Creates a new mover with the provided data.
     * 
     * @param {any} data - Data used to create the mover.
     * @returns {Promise<any>} The created mover.
     */
    async createMover(data: any) {
        return this.MoverRepo.createMover(data);
    }

    /**
     * Loads items onto a mover. 
     * Ensures that items are within weight limits and the mover is not already on a mission.
     * 
     * @param {string} MoverId - The ID of the mover.
     * @param {string[]} itemIds - The IDs of the items to load onto the mover.
     * @returns {Promise<any>} The updated mover.
     */
    async loadItems(MoverId: string, itemIds: string[]) {
        const Mover = await this.MoverRepo.findMoverById(MoverId);
        if (!Mover) {
            this.logger.error(`Mover with ID ${MoverId} not found.`);
            throw new Error(" Mover not found.");
        }
        if (Mover.questState === "on-mission") {
            this.logger.error(`Mover with ID ${MoverId} is already on a mission.`);
            throw new Error("Cannot load items while on a mission.");
        }

        const items = await Item.find({ _id: { $in: itemIds } });
        if (items.length !== itemIds.length) {
            this.logger.error(`One or more items not found for Mover with ID ${MoverId}.`);
            throw new Error("One or more items not found.");
        }

        const currentLoadedWeight = items.reduce((acc, item) => acc + item.weight, 0);
        const loadedWeight = (Mover.items as any[]).reduce((acc, item) => acc + item.weight, 0);
        const totalWeight = currentLoadedWeight + loadedWeight;

        if (totalWeight > Mover.weightLimit) {
            this.logger.error(`Items exceed the weight limit for Mover with ID ${MoverId}.`);
            throw new Error("Items exceed Mover's weight limit.");
        }

        Mover.items.push(...items);
        Mover.questState = "loading";
        await Mover.save();
        await this.missionLogRepo.createLog(MoverId, "loading");

        this.logger.info(`Successfully loaded items onto Mover with ID ${MoverId}.`);
        return Mover;
    }

    /**
     * Starts a mission for the specified mover.
     * 
     * @param {string} MoverId - The ID of the mover to start the mission for.
     * @returns {Promise<any>} The updated mover with mission started.
     */
    async startMission(MoverId: string) {
        try {

            const Mover = await this.MoverRepo.findMoverById(MoverId);
            if (!Mover) {
                this.logger.error(`Mover with ID ${MoverId} not found.`);
                throw new Error(" Mover not found.");
            }
            if (Mover.questState === "on-mission") {
                this.logger.error(`Mover with ID ${MoverId} is already on a mission.`);
                throw new Error("Already on a mission.");
            }

            Mover.questState = "on-mission";
            console.log(Mover)
            await Mover.save();
            this.logger.info(`Mission started for Mover with ID ${MoverId}.`);
            await this.missionLogRepo.createLog(MoverId, "on-mission");

            return Mover;
        } catch (err: any) {
            this.logger.error(`Error starting mission for Mover with ID ${MoverId}: ${err.message}`);
            throw err;
        }
    }

    /**
     * Ends the mission for the specified mover.
     * 
     * @param {string} MoverId - The ID of the mover to end the mission for.
     * @returns {Promise<any>} The updated mover with mission ended.
     */
    async endMission(MoverId: string) {
        const Mover = await this.MoverRepo.findMoverById(MoverId);
        if (!Mover) {
            this.logger.error(`Mover with ID ${MoverId} not found.`);
            throw new Error(" Mover not found.");
        }
        if (Mover.questState === "resting") {
            this.logger.error(`Mission already ended for Mover with ID ${MoverId}.`);
            throw new Error("Mission already ended.");
        }

        Mover.items = [];
        Mover.questState = "resting";
        Mover.missionsCompleted += 1;

        await Mover.save();
        await this.missionLogRepo.createLog(MoverId, "unloading");

        this.logger.info(`Mission ended for Mover with ID ${MoverId}.`);
        return Mover;
    }

    /**
     * Retrieves the mover with the most completed missions.
     * 
     * @returns {Promise<any>} The mover with the most completed missions.
     */
    async getMostCompletedMissions() {
        try {
            return this.MoverRepo.getMostCompletedMissions();
        } catch (err: any) {
            this.logger.error(`Error fetching mover with most completed missions: ${err.message}`);
            throw err;
        }
    }

    /**
     * Retrieves all movers.
     * 
     * @returns {Promise<any[]>} A list of all movers.
     */
    async getAllItems() {
        try {
            return this.MoverRepo.getAllMovers();
        } catch (err: any) {
            this.logger.error(`Error fetching all movers: ${err.message}`);
            throw err;
        }
    }
}

export default MoverService;
