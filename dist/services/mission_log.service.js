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
const mission_log_repo_1 = __importDefault(require("../repositories/mission_log.repo"));
/**
 * MissionLogService handles the business logic related to mission logs.
 * It interacts with the MissionLogRepo to perform operations on mission log data.
 */
let MissionLogService = class MissionLogService {
    /**
     * @param {MissionLogRepo} missionLogRepo - An instance of the MissionLogRepo class used to interact with the mission log data.
     */
    constructor(missionLogRepo) {
        this.missionLogRepo = missionLogRepo;
    }
    /**
     * Retrieves all mission log items from the repository.
     *
     * @returns {Promise<any[]>} A list of all mission log items.
     */
    async getAllMissionLogItems() {
        return this.missionLogRepo.getAllItems();
    }
};
MissionLogService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(mission_log_repo_1.default)),
    __metadata("design:paramtypes", [mission_log_repo_1.default])
], MissionLogService);
exports.default = MissionLogService;
