"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mover_repo_1 = require("../../src/repositories/mover.repo");
var mover_model_1 = require("../..//src/models/mover.model");
jest.mock("../../src/models/mover.model.ts"); // Mock the Mongoose model
describe("MoverRepo", function () {
    var moverRepo;
    beforeEach(function () {
        jest.clearAllMocks();
        moverRepo = new mover_repo_1["default"]();
    });
    describe("createMover", function () {
        it("should create a new mover and return the document", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockMoverData, mockSavedMover, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockMoverData = { weightLimit: 600, questState: "resting", items: [], missionsCompleted: 0 };
                        mockSavedMover = __assign(__assign({}, mockMoverData), { _id: "12345" });
                        // Mock Mongoose methods
                        mover_model_1["default"].mockImplementation(function () { return ({
                            save: jest.fn().mockResolvedValue(mockSavedMover)
                        }); });
                        return [4 /*yield*/, moverRepo.createMover(mockMoverData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockSavedMover);
                        expect(mover_model_1["default"]).toHaveBeenCalledWith(mockMoverData);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error if creation fails", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockMoverData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockMoverData = { weightLimit: 600, questState: "resting" };
                        // Mock Mongoose methods
                        mover_model_1["default"].mockImplementation(function () { return ({
                            save: jest.fn().mockRejectedValue(new Error("Failed to save"))
                        }); });
                        return [4 /*yield*/, expect(moverRepo.createMover(mockMoverData)).rejects.toThrow("Failed to create mover: Failed to save")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("findMoverById", function () {
        it("should find a mover by ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockMoverId, mockMover, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockMoverId = "12345";
                        mockMover = { _id: mockMoverId, weightLimit: 600, questState: "resting", items: [] };
                        // Mock Mongoose methods
                        mover_model_1["default"].findById = jest.fn().mockResolvedValue(mockMover);
                        return [4 /*yield*/, moverRepo.findMoverById(mockMoverId)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockMover);
                        expect(mover_model_1["default"].findById).toHaveBeenCalledWith(mockMoverId);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error if the mover is not found", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockMoverId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockMoverId = "12345";
                        // Mock Mongoose methods
                        mover_model_1["default"].findById = jest.fn().mockRejectedValue(new Error("Failed to find"));
                        return [4 /*yield*/, expect(moverRepo.findMoverById(mockMoverId)).rejects.toThrow("Failed to find mover by ID: Failed to find")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("updateMover", function () {
        it("should update a mover and return the updated document", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockMoverId, mockUpdateData, mockUpdatedMover, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockMoverId = "12345";
                        mockUpdateData = { questState: "loading" };
                        mockUpdatedMover = __assign({ _id: mockMoverId }, mockUpdateData);
                        // Mock Mongoose methods
                        mover_model_1["default"].findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedMover);
                        return [4 /*yield*/, moverRepo.updateMover(mockMoverId, mockUpdateData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockUpdatedMover);
                        expect(mover_model_1["default"].findByIdAndUpdate).toHaveBeenCalledWith(mockMoverId, mockUpdateData, { "new": true });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error if updating fails", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockMoverId, mockUpdateData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockMoverId = "12345";
                        mockUpdateData = { questState: "loading" };
                        // Mock Mongoose methods
                        mover_model_1["default"].findByIdAndUpdate = jest.fn().mockRejectedValue(new Error("Failed to update"));
                        return [4 /*yield*/, expect(moverRepo.updateMover(mockMoverId, mockUpdateData)).rejects.toThrow("Failed to update mover: Failed to update")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getMostCompletedMissions", function () {
        it("should retrieve movers sorted by completed missions", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockMovers, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockMovers = [
                            { _id: "1", missionsCompleted: 10 },
                            { _id: "2", missionsCompleted: 5 },
                        ];
                        // Mock Mongoose methods
                        mover_model_1["default"].find = jest.fn().mockReturnValue({
                            sort: jest.fn().mockResolvedValue(mockMovers)
                        });
                        return [4 /*yield*/, moverRepo.getMostCompletedMissions()];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockMovers);
                        expect(mover_model_1["default"].find).toHaveBeenCalled();
                        expect(mover_model_1["default"].find().sort).toHaveBeenCalledWith({ missionsCompleted: -1 });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error if retrieval fails", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mover_model_1["default"].find = jest.fn().mockReturnValue({
                            sort: jest.fn().mockRejectedValue(new Error("Failed to retrieve"))
                        });
                        return [4 /*yield*/, expect(moverRepo.getMostCompletedMissions()).rejects.toThrow("Failed to retrieve most completed missions: Failed to retrieve")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getAllMovers", function () {
        it("should retrieve all movers and populate items", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockMovers, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockMovers = [{ _id: "1", items: ["item1"] }];
                        // Mock Mongoose methods
                        mover_model_1["default"].find = jest.fn().mockReturnValue({
                            populate: jest.fn().mockResolvedValue(mockMovers)
                        });
                        return [4 /*yield*/, moverRepo.getAllMovers()];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockMovers);
                        expect(mover_model_1["default"].find).toHaveBeenCalled();
                        expect(mover_model_1["default"].find().populate).toHaveBeenCalledWith("items");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return an empty array if retrieval fails", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mover_model_1["default"].find = jest.fn().mockReturnValue({
                            populate: jest.fn().mockRejectedValue(new Error("Failed to retrieve"))
                        });
                        return [4 /*yield*/, moverRepo.getAllMovers()];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
