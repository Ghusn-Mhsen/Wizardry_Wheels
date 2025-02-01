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
var mover_repo_1 = require("../repositories/mover.repo");
var item_model_1 = require("../models/item.model");
var mission_log_repo_1 = require("../repositories/mission_log.repo"); // Assuming a mission log repository
var logging_1 = require("../utils/handlers/logging");
var MoverService = /** @class */ (function () {
    function MoverService(MoverRepo, missionLogRepo) {
        this.MoverRepo = MoverRepo;
        this.missionLogRepo = missionLogRepo;
        this.logger = logging_1["default"].getInstance("mover"); // Logger for this service
    }
    /**
     * Creates a new mover with the provided data.
     *
     * @param {any} data - Data used to create the mover.
     * @returns {Promise<any>} The created mover.
     */
    MoverService.prototype.createMover = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.MoverRepo.createMover(data)];
            });
        });
    };
    /**
     * Loads items onto a mover.
     * Ensures that items are within weight limits and the mover is not already on a mission.
     *
     * @param {string} MoverId - The ID of the mover.
     * @param {string[]} itemIds - The IDs of the items to load onto the mover.
     * @returns {Promise<any>} The updated mover.
     */
    MoverService.prototype.loadItems = function (MoverId, itemIds) {
        return __awaiter(this, void 0, void 0, function () {
            var Mover, items, currentLoadedWeight, loadedWeight, totalWeight;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.MoverRepo.findMoverById(MoverId)];
                    case 1:
                        Mover = _b.sent();
                        if (!Mover) {
                            this.logger.error("Mover with ID " + MoverId + " not found.");
                            throw new Error(" Mover not found.");
                        }
                        if (Mover.questState === "on-mission") {
                            this.logger.error("Mover with ID " + MoverId + " is already on a mission.");
                            throw new Error("Cannot load items while on a mission.");
                        }
                        return [4 /*yield*/, item_model_1["default"].find({ _id: { $in: itemIds } })];
                    case 2:
                        items = _b.sent();
                        if (items.length !== itemIds.length) {
                            this.logger.error("One or more items not found for Mover with ID " + MoverId + ".");
                            throw new Error("One or more items not found.");
                        }
                        currentLoadedWeight = items.reduce(function (acc, item) { return acc + item.weight; }, 0);
                        loadedWeight = Mover.items.reduce(function (acc, item) { return acc + item.weight; }, 0);
                        totalWeight = currentLoadedWeight + loadedWeight;
                        if (totalWeight > Mover.weightLimit) {
                            this.logger.error("Items exceed the weight limit for Mover with ID " + MoverId + ".");
                            throw new Error("Items exceed Mover's weight limit.");
                        }
                        (_a = Mover.items).push.apply(_a, items);
                        Mover.questState = "loading";
                        return [4 /*yield*/, Mover.save()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.missionLogRepo.createLog(MoverId, "loading")];
                    case 4:
                        _b.sent();
                        this.logger.info("Successfully loaded items onto Mover with ID " + MoverId + ".");
                        return [2 /*return*/, Mover];
                }
            });
        });
    };
    /**
     * Starts a mission for the specified mover.
     *
     * @param {string} MoverId - The ID of the mover to start the mission for.
     * @returns {Promise<any>} The updated mover with mission started.
     */
    MoverService.prototype.startMission = function (MoverId) {
        return __awaiter(this, void 0, void 0, function () {
            var Mover, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.MoverRepo.findMoverById(MoverId)];
                    case 1:
                        Mover = _a.sent();
                        if (!Mover) {
                            this.logger.error("Mover with ID " + MoverId + " not found.");
                            throw new Error(" Mover not found.");
                        }
                        if (Mover.questState === "on-mission") {
                            this.logger.error("Mover with ID " + MoverId + " is already on a mission.");
                            throw new Error("Already on a mission.");
                        }
                        Mover.questState = "on-mission";
                        console.log(Mover);
                        return [4 /*yield*/, Mover.save()];
                    case 2:
                        _a.sent();
                        this.logger.info("Mission started for Mover with ID " + MoverId + ".");
                        return [4 /*yield*/, this.missionLogRepo.createLog(MoverId, "on-mission")];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, Mover];
                    case 4:
                        err_1 = _a.sent();
                        this.logger.error("Error starting mission for Mover with ID " + MoverId + ": " + err_1.message);
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Ends the mission for the specified mover.
     *
     * @param {string} MoverId - The ID of the mover to end the mission for.
     * @returns {Promise<any>} The updated mover with mission ended.
     */
    MoverService.prototype.endMission = function (MoverId) {
        return __awaiter(this, void 0, void 0, function () {
            var Mover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.MoverRepo.findMoverById(MoverId)];
                    case 1:
                        Mover = _a.sent();
                        if (!Mover) {
                            this.logger.error("Mover with ID " + MoverId + " not found.");
                            throw new Error(" Mover not found.");
                        }
                        if (Mover.questState === "resting") {
                            this.logger.error("Mission already ended for Mover with ID " + MoverId + ".");
                            throw new Error("Mission already ended.");
                        }
                        Mover.items = [];
                        Mover.questState = "resting";
                        Mover.missionsCompleted += 1;
                        return [4 /*yield*/, Mover.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.missionLogRepo.createLog(MoverId, "unloading")];
                    case 3:
                        _a.sent();
                        this.logger.info("Mission ended for Mover with ID " + MoverId + ".");
                        return [2 /*return*/, Mover];
                }
            });
        });
    };
    /**
     * Retrieves the mover with the most completed missions.
     *
     * @returns {Promise<any>} The mover with the most completed missions.
     */
    MoverService.prototype.getMostCompletedMissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.MoverRepo.getMostCompletedMissions()];
                }
                catch (err) {
                    this.logger.error("Error fetching mover with most completed missions: " + err.message);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Retrieves all movers.
     *
     * @returns {Promise<any[]>} A list of all movers.
     */
    MoverService.prototype.getAllItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.MoverRepo.getAllMovers()];
                }
                catch (err) {
                    this.logger.error("Error fetching all movers: " + err.message);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    MoverService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(mover_repo_1["default"])),
        __param(1, tsyringe_1.inject(mission_log_repo_1["default"]))
    ], MoverService);
    return MoverService;
}());
exports["default"] = MoverService;
