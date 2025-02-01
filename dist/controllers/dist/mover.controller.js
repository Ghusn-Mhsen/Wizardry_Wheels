"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var mover_service_1 = require("../services/mover.service");
var httpStatus_1 = require("../utils/httpStatus");
/**
 * Controller for managing mover-related operations.
 * Contains methods for creating, loading, starting, ending missions, and fetching mover data.
 */
var MoverController = /** @class */ (function () {
    /**
     * Creates an instance of the MoverController.
     *
     * @param {MoverService} MoverService - The service that handles the business logic for movers.
     */
    function MoverController(MoverService) {
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
    MoverController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var Mover, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.MoverService.createMover(req.body)];
                    case 1:
                        Mover = _a.sent();
                        res.status(httpStatus_1.HttpStatus.Created.code).json({
                            message: httpStatus_1.HttpStatus.Created.description,
                            data: Mover
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                            message: error_1 || httpStatus_1.HttpStatus.BAD_REQUEST.description
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles loading items into a mover.
     *
     * @param {Request} req - The request object containing the mover ID and item IDs to load.
     * @param {Response} res - The response object used to send the result back to the client.
     *
     * @returns {Promise<void>} A promise that resolves when the mover has been updated with loaded items.
     */
    MoverController.prototype.load = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, MoverId, itemIds, updatedMover, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, MoverId = _a.MoverId, itemIds = _a.itemIds;
                        return [4 /*yield*/, this.MoverService.loadItems(MoverId, itemIds)];
                    case 1:
                        updatedMover = _b.sent();
                        res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                            message: httpStatus_1.HttpStatus.SUCCESS.description,
                            data: updatedMover
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                            message: error_2 || httpStatus_1.HttpStatus.BAD_REQUEST.description
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles starting a mission for a mover.
     *
     * @param {Request} req - The request object containing the mover ID.
     * @param {Response} res - The response object used to send the result back to the client.
     *
     * @returns {Promise<void>} A promise that resolves when the mission has been started for the mover.
     */
    MoverController.prototype.startMission = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var MoverId, updatedMover, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        MoverId = req.body.MoverId;
                        return [4 /*yield*/, this.MoverService.startMission(MoverId)];
                    case 1:
                        updatedMover = _a.sent();
                        res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                            message: httpStatus_1.HttpStatus.SUCCESS.description,
                            data: updatedMover
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                            message: error_3.message || httpStatus_1.HttpStatus.BAD_REQUEST.description
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles ending a mission for a mover.
     *
     * @param {Request} req - The request object containing the mover ID.
     * @param {Response} res - The response object used to send the result back to the client.
     *
     * @returns {Promise<void>} A promise that resolves when the mission has been ended for the mover.
     */
    MoverController.prototype.endMission = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var MoverId, updatedMover, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        MoverId = req.body.MoverId;
                        return [4 /*yield*/, this.MoverService.endMission(MoverId)];
                    case 1:
                        updatedMover = _a.sent();
                        res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                            message: httpStatus_1.HttpStatus.SUCCESS.description,
                            data: updatedMover
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                            message: error_4 || httpStatus_1.HttpStatus.BAD_REQUEST.description
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles retrieving the movers with the most completed missions.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object used to send the result back to the client.
     *
     * @returns {Promise<void>} A promise that resolves when the movers with the most completed missions have been retrieved.
     */
    MoverController.prototype.getMostCompleted = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var movers, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.MoverService.getMostCompletedMissions()];
                    case 1:
                        movers = _a.sent();
                        res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                            message: httpStatus_1.HttpStatus.SUCCESS.description,
                            data: movers
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                            message: error_5 || httpStatus_1.HttpStatus.BAD_REQUEST.description
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles retrieving all movers.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object used to send the list of movers back to the client.
     *
     * @returns {Promise<void>} A promise that resolves when the movers have been retrieved.
     */
    MoverController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var Movers, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.MoverService.getAllItems()];
                    case 1:
                        Movers = _a.sent();
                        res.status(httpStatus_1.HttpStatus.SUCCESS.code).json({
                            message: httpStatus_1.HttpStatus.SUCCESS.description,
                            data: Movers
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        res.status(httpStatus_1.HttpStatus.BAD_REQUEST.code).json({
                            message: error_6 || httpStatus_1.HttpStatus.BAD_REQUEST.description
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MoverController = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(mover_service_1["default"]))
    ], MoverController);
    return MoverController;
}());
exports["default"] = MoverController;
