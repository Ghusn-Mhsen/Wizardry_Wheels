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
var config_1 = require("../config");
var mongoose_1 = require("mongoose");
/**
 * Class responsible for managing the database connection.
 * Provides methods to connect to and disconnect from the MongoDB database.
 */
var AppDataSource = /** @class */ (function () {
    /**
     * Constructor for the AppDataSource class.
     * Initializes the database connection instance.
     */
    function AppDataSource() {
        console.log("Database class constructor called");
    }
    /**
     * Connects to the MongoDB database using Mongoose.
     *
     * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
     * @throws {Error} If the connection fails, the process will exit with an error.
     */
    AppDataSource.prototype.connect = function () {
        return __awaiter(this, void 0, Promise, function () {
            var databaseUrl, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        databaseUrl = "mongodb://" + config_1["default"].mongo.user + ":" + config_1["default"].mongo.password + "@" + config_1["default"].mongo.host + ":" + config_1["default"].mongo.port + "/?authSource=admin";
                        if (config_1["default"].nodeEnv === 'test') {
                            databaseUrl = 'mongodb://localhost:27017/Magic'; // Hardcoded for now.
                        }
                        if (!databaseUrl) {
                            console.error("DATABASE_URL is not defined");
                            process.exit(1); // Exit process if the database URL is not found
                        }
                        console.log("Connecting to database: " + databaseUrl);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, mongoose_1["default"].connect(databaseUrl)];
                    case 2:
                        _a.sent();
                        console.log("Database connection successful");
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error("Database connection error:", err_1);
                        process.exit(1); // Ensure the process exits on connection failure
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Disconnects from the MongoDB database.
     *
     * @returns {void} This method does not return anything.
     * @throws {Error} If the disconnection fails, an error will be logged.
     */
    AppDataSource.prototype.disconnect = function () {
        return __awaiter(this, void 0, Promise, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, mongoose_1["default"]
                                .disconnect()];
                    case 1:
                        _a.sent();
                        console.log("Database disconnected successfully");
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.error("Error disconnecting from the database:", err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AppDataSource;
}());
// Export a single instance of the AppDataSource class
/**
 * A singleton instance of the AppDataSource class.
 * Used to manage the database connection across the application.
 */
exports["default"] = new AppDataSource();
