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
var mission_log_repo_1 = require("../../src/repositories/mission_log.repo");
var mission_log_model_1 = require("../../src/models/mission_log.model"); // Mongoose Model
jest.mock('../../src/models/mission_log.model', function () {
    var mockMissionLog = jest.fn(); // Mock constructor
    mockMissionLog.prototype.save = jest.fn(); // Mock instance methods
    mockMissionLog.find = jest.fn(); // Mock static methods
    return mockMissionLog;
});
describe('MissionLogRepo', function () {
    var missionLogRepo;
    beforeEach(function () {
        missionLogRepo = new mission_log_repo_1["default"]();
    });
    describe('createLog', function () {
        it('should create a mission log successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData, mockLog, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockData = { MoverId: '1', action: 'loading' };
                        mockLog = __assign(__assign({ _id: '1' }, mockData), { save: jest.fn() });
                        mission_log_model_1["default"].prototype.save.mockResolvedValueOnce(mockLog);
                        return [4 /*yield*/, missionLogRepo.createLog(mockData.MoverId, mockData.action)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockLog);
                        expect(mission_log_model_1["default"].prototype.save).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if log creation fails', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockData = { MoverId: '1', action: 'on-mission' };
                        mission_log_model_1["default"].prototype.save.mockRejectedValueOnce(new Error('Database error'));
                        return [4 /*yield*/, expect(missionLogRepo.createLog(mockData.MoverId, mockData.action)).rejects.toThrowError('Failed to create mission log: Database error')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getAllItems', function () {
        it('should return all mission logs', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockLogs, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockLogs = [
                            { _id: '1', MoverId: '1', action: 'loading' },
                            { _id: '2', MoverId: '2', action: 'unloading' },
                        ];
                        mission_log_model_1["default"].find.mockResolvedValueOnce(mockLogs);
                        return [4 /*yield*/, missionLogRepo.getAllItems()];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockLogs);
                        expect(mission_log_model_1["default"].find).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if retrieving mission logs fails', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mission_log_model_1["default"].find.mockRejectedValueOnce(new Error('Failed to retrieve mission logs'));
                        return [4 /*yield*/, expect(missionLogRepo.getAllItems()).rejects.toThrowError('Failed to retrieve mission logs: Failed to retrieve mission logs')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
