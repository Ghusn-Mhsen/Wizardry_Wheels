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
const mover_service_1 = __importDefault(require("../services/mover.service"));
const httpStatus_1 = require("../utils/httpStatus");
/**
 * Controller for managing mover-related operations.
 * Contains methods for creating, loading, starting, ending missions, and fetching mover data.
 */
let MoverController = class MoverController {
    /**
     * Creates an instance of the MoverController.
     *
     * @param {MoverService} MoverService - The service that handles the business logic for movers.
     */
    constructor(MoverService) {
        this.MoverService = MoverService;
    }
    /**
     * Handles the creation of a new mover.
     *
     * @param {Request} req - The request object containing the mover data in the body.
     * @param {Response} res - The response object used to send the result back to the client.
     *
     * @returns {Promise<void>} A promise that resolves when the mover has been created.
     */
    async create(req, res) {
        try {
            const Mover = await this.MoverService.createMover(req.body);
            res.status(httpStatus_1.HttpStatus.Created.code).json({
                message: httpStatus_1.HttpStatus.Created.description,
                data: Mover,
            });
        }
        catch (error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                message: error || httpStatus_1.HttpStatus.BAD_REQUEST.description,
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
    async load(req, res) {
        try {
            const { MoverId, itemIds } = req.body;
            const updatedMover = await this.MoverService.loadItems(MoverId, itemIds);
            res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                message: httpStatus_1.HttpStatus.SUCCESS.description,
                data: updatedMover,
            });
        }
        catch (error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                message: error || httpStatus_1.HttpStatus.BAD_REQUEST.description,
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
    async startMission(req, res) {
        try {
            const { MoverId } = req.body;
            const updatedMover = await this.MoverService.startMission(MoverId);
            res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                message: httpStatus_1.HttpStatus.SUCCESS.description,
                data: updatedMover,
            });
        }
        catch (error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                message: error.message || httpStatus_1.HttpStatus.BAD_REQUEST.description,
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
    async endMission(req, res) {
        try {
            const { MoverId } = req.body;
            const updatedMover = await this.MoverService.endMission(MoverId);
            res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                message: httpStatus_1.HttpStatus.SUCCESS.description,
                data: updatedMover,
            });
        }
        catch (error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                message: error || httpStatus_1.HttpStatus.BAD_REQUEST.description,
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
    async getMostCompleted(req, res) {
        try {
            const movers = await this.MoverService.getMostCompletedMissions();
            res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                message: httpStatus_1.HttpStatus.SUCCESS.description,
                data: movers,
            });
        }
        catch (error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                message: error || httpStatus_1.HttpStatus.BAD_REQUEST.description,
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
    async getAll(req, res) {
        try {
            const Movers = await this.MoverService.getAllItems();
            res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                message: httpStatus_1.HttpStatus.SUCCESS.description,
                data: Movers,
            });
        }
        catch (error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                message: error || httpStatus_1.HttpStatus.BAD_REQUEST.description,
            });
        }
    }
};
MoverController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(mover_service_1.default)),
    __metadata("design:paramtypes", [mover_service_1.default])
], MoverController);
exports.default = MoverController;
