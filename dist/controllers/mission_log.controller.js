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
const mission_log_service_1 = __importDefault(require("../services/mission_log.service"));
const httpStatus_1 = require("../utils/httpStatus");
/**
 * Controller for managing mission log operations.
 * Contains a method for retrieving all mission log entries.
 */
let MissionLogController = class MissionLogController {
    /**
     * Creates an instance of the MissionLogController.
     *
     * @param {MissionLogService} missionLogService - The service that handles the business logic for mission logs.
     */
    constructor(missionLogService) {
        this.missionLogService = missionLogService;
    }
    /**
     * Retrieves all mission log entries.
     *
     * @param {Request} req - The request object representing the HTTP request.
     * @param {Response} res - The response object used to send the result back to the client.
     *
     * @returns {Promise<void>} A promise that resolves when the mission logs have been retrieved and the response has been sent.
     */
    async getAll(req, res) {
        try {
            const missionLogItems = await this.missionLogService.getAllMissionLogItems();
            res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                message: httpStatus_1.HttpStatus.SUCCESS.description,
                data: missionLogItems,
            });
        }
        catch (error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                message: error || httpStatus_1.HttpStatus.BAD_REQUEST.description,
            });
        }
    }
};
MissionLogController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(mission_log_service_1.default)),
    __metadata("design:paramtypes", [mission_log_service_1.default])
], MissionLogController);
exports.default = MissionLogController;
