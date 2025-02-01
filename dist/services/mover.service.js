"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const mover_repo_1 = __importDefault(require("../repositories/mover.repo"));
const item_model_1 = __importDefault(require("../models/item.model"));
const mission_log_repo_1 = __importDefault(require("../repositories/mission_log.repo")); // Assuming a mission log repository
const logging_1 = __importDefault(require("../utils/handlers/logging"));
let MoverService = class MoverService {
    constructor(MoverRepo, missionLogRepo) {
        this.MoverRepo = MoverRepo;
        this.missionLogRepo = missionLogRepo;
        this.logger = logging_1.default.getInstance("mover"); // Logger for this service
    }
    /**
     * Creates a new mover with the provided data.
     *
     * @param {any} data - Data used to create the mover.
     * @returns {Promise<any>} The created mover.
     */
    async createMover(data) {
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
    async loadItems(MoverId, itemIds) {
        const Mover = await this.MoverRepo.findMoverById(MoverId);
        if (!Mover) {
            this.logger.error(`Mover with ID ${MoverId} not found.`);
            throw new Error(" Mover not found.");
        }
        if (Mover.questState === "on-mission") {
            this.logger.error(`Mover with ID ${MoverId} is already on a mission.`);
            throw new Error("Cannot load items while on a mission.");
        }
        const items = await item_model_1.default.find({ _id: { $in: itemIds } });
        if (items.length !== itemIds.length) {
            this.logger.error(`One or more items not found for Mover with ID ${MoverId}.`);
            throw new Error("One or more items not found.");
        }
        const currentLoadedWeight = items.reduce((acc, item) => acc + item.weight, 0);
        const loadedWeight = Mover.items.reduce((acc, item) => acc + item.weight, 0);
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
    async startMission(MoverId) {
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
            console.log(Mover);
            await Mover.save();
            this.logger.info(`Mission started for Mover with ID ${MoverId}.`);
            await this.missionLogRepo.createLog(MoverId, "on-mission");
            return Mover;
        }
        catch (err) {
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
    async endMission(MoverId) {
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
        }
        catch (err) {
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
        }
        catch (err) {
            this.logger.error(`Error fetching all movers: ${err.message}`);
            throw err;
        }
    }
};
MoverService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(mover_repo_1.default)),
    __param(1, (0, tsyringe_1.inject)(mission_log_repo_1.default)),
    __metadata("design:paramtypes", [mover_repo_1.default,
        mission_log_repo_1.default])
], MoverService);
exports.default = MoverService;
