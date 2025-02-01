"use strict";
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
var supertest_1 = require("supertest");
var index_1 = require("../../src/index");
var db_connection_1 = require("../../src/config/DB/db.connection");
var app;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.initializeApp()];
            case 1:
                app = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_connection_1["default"].disconnect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, index_1.stopServer()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("Mover Endpoints", function () {
    var createdMoverId;
    it("should create a new Mover", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, createdMover;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](app)
                        .post("/api/v1/movers")
                        .send({
                        weightLimit: 600,
                        questState: "resting",
                        items: [
                            "6796460f9f51605cfbf77f43",
                        ],
                        missionsCompleted: 0
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(201);
                    expect(res.body).toHaveProperty("message", "Created");
                    expect(res.body.data).toHaveProperty("weightLimit", 600);
                    expect(res.body.data).toHaveProperty("questState", "resting");
                    expect(res.body.data).toHaveProperty("missionsCompleted", 0);
                    expect(res.body.data).toHaveProperty("_id");
                    expect(res.body.data).toHaveProperty("createdAt");
                    expect(res.body.data).toHaveProperty("updatedAt");
                    expect(res.body.data).toHaveProperty("__v");
                    createdMover = res.body.data;
                    expect(Array.isArray(createdMover.items)).toBeTruthy();
                    expect(createdMover.items.length).toBeGreaterThan(0);
                    createdMover.items.forEach(function (itemId) {
                        expect(itemId).toMatch(/^[a-f\d]{24}$/); // MongoDB ObjectId pattern
                    });
                    createdMoverId = res.body.data._id;
                    return [2 /*return*/];
            }
        });
    }); });
    it("should fetch all Movers", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](app).get("/api/v1/movers")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty("message", "Success");
                    expect(Array.isArray(res.body.data)).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should load items into a Mover", function () { return __awaiter(void 0, void 0, void 0, function () {
        var resItems, ItemId, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](app).get("/api/v1/items/").send()];
                case 1:
                    resItems = _a.sent();
                    ItemId = resItems.body.data[0]._id;
                    return [4 /*yield*/, supertest_1["default"](app)
                            .post("/api/v1/movers/load")
                            .send({ MoverId: createdMoverId, itemIds: [ItemId] })];
                case 2:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty("message", "Success");
                    expect(Array.isArray(res.body.data.items)).toBeTruthy();
                    expect(res.body.data.items[0]).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should start a mission for a Mover", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](app)
                        .post("/api/v1/movers/start-mission")
                        .send({ MoverId: createdMoverId })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty("message", "Success");
                    expect(res.body.data.questState).toEqual("on-mission");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should end a mission for a Mover", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](app)
                        .post("/api/v1/movers/end-mission")
                        .send({ MoverId: createdMoverId })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty("message", "Success");
                    expect(res.body.data.questState).toEqual("resting");
                    expect(res.body.data.missionsCompleted).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should fetch the Mover with the most missions completed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, topMover;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](app).get("/api/v1/movers/most-completed")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty("message", "Success");
                    expect(Array.isArray(res.body.data)).toBeTruthy();
                    topMover = res.body.data[0];
                    expect(topMover).toHaveProperty("_id");
                    expect(topMover).toHaveProperty("missionsCompleted");
                    return [2 /*return*/];
            }
        });
    }); });
});
