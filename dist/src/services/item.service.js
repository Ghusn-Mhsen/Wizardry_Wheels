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
const item_repo_1 = __importDefault(require("../repositories/item.repo"));
/**
 * ItemService is responsible for handling the business logic related to items.
 * It interacts with the ItemRepo to perform CRUD operations on items.
 */
let ItemService = class ItemService {
    /**
     * @param {ItemRepo} ItemRepo - An instance of the ItemRepo class used to interact with the database.
     */
    constructor(ItemRepo) {
        this.ItemRepo = ItemRepo;
    }
    /**
     * Creates a new item in the repository.
     *
     * @param {any} data - The data for the item to be created.
     * @returns {Promise<any>} The result of the creation process, typically the created item.
     */
    async createItem(data) {
        return this.ItemRepo.createItem(data);
    }
    /**
     * Retrieves all items from the repository.
     *
     * @returns {Promise<any[]>} A list of all items.
     */
    async getAllItems() {
        return this.ItemRepo.getAllItems();
    }
};
ItemService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(item_repo_1.default)),
    __metadata("design:paramtypes", [item_repo_1.default])
], ItemService);
exports.default = ItemService;
