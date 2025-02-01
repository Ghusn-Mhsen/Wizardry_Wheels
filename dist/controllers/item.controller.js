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
const item_service_1 = __importDefault(require("../services/item.service"));
const httpStatus_1 = require("../utils/httpStatus");
/**
 * Controller for managing Item-related operations.
 * Contains methods for creating and retrieving items.
 */
let ItemController = class ItemController {
    /**
     * @param {ItemService} ItemService - The service that handles the business logic for items.
     */
    constructor(ItemService) {
        this.ItemService = ItemService;
    }
    /**
     * Handles the creation of a new item.
     *
     * @param {Request} req - The request object containing the item data in the body.
     * @param {Response} res - The response object used to send the result back to the client.
     *
     * @returns {Promise<void>} A promise that resolves when the item has been created.
     */
    async create(req, res) {
        try {
            const Item = await this.ItemService.createItem(req.body);
            res.status(httpStatus_1.HttpStatus.Created.code).json({
                message: httpStatus_1.HttpStatus.Created.description,
                data: Item,
            });
        }
        catch (error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                message: error || httpStatus_1.HttpStatus.BAD_REQUEST.description,
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
    async getAll(req, res) {
        try {
            const Items = await this.ItemService.getAllItems();
            res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                message: httpStatus_1.HttpStatus.SUCCESS.description,
                data: Items,
            });
        }
        catch (error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                message: error || httpStatus_1.HttpStatus.BAD_REQUEST.description,
            });
        }
    }
};
ItemController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(item_service_1.default)),
    __metadata("design:paramtypes", [item_service_1.default])
], ItemController);
exports.default = ItemController;
