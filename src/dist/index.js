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
exports.stopServer = exports.initializeApp = void 0;
var express_1 = require("express");
var db_connection_1 = require("./config/DB/db.connection");
var server_1 = require("./server");
var config_1 = require("./config/config");
var logging_1 = require("./utils/handlers/logging");
var logger = logging_1["default"].getInstance("server");
var server;
/**
 * Initializes the Express application by connecting to the database and setting up the server.
 *
 * @returns {Promise<Application>} The initialized Express application.
 */
function initializeApp() {
    return __awaiter(this, void 0, Promise, function () {
        var app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Connect to the database
                return [4 /*yield*/, db_connection_1["default"].connect()];
                case 1:
                    // Connect to the database
                    _a.sent();
                    app = express_1["default"]();
                    new server_1["default"](app); // Initialize the server with the app
                    return [2 /*return*/, app];
            }
        });
    });
}
exports.initializeApp = initializeApp;
/**
 * Starts the server after initializing the application.
 * It listens on a specified port and handles any errors during startup.
 *
 * @returns {Promise<void>} A promise indicating the server has started or failed to start.
 */
function startServer() {
    return __awaiter(this, void 0, Promise, function () {
        var app, port_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, initializeApp()];
                case 1:
                    app = _a.sent();
                    port_1 = config_1["default"].port ? parseInt(config_1["default"].port) : 4000;
                    server = app.listen(port_1, "0.0.0.0", function () {
                        console.log("Server running on: http://localhost:" + port_1);
                    }).on("error", function (err) {
                        if (err.code === "EADDRINUSE") {
                            console.log("Server startup error: Address already in use");
                        }
                        else {
                            logger.error("Error starting the server:", err);
                        }
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger.error("Error initializing the application:", error_1);
                    process.exit(1); // Ensure the process exits on initialization failure
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
process.on("uncaughtException", function (err) {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
process.on("unhandledRejection", function (reason, promise) {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", function (err) {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
process.on("unhandledRejection", function (reason, promise) {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    console.log(reason);
});
function stopServer() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!server) return [3 /*break*/, 2];
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            server.close(function (err) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    console.log("Server stopped successfully");
                                    resolve();
                                }
                            });
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.stopServer = stopServer;
// Start the server
startServer();
/*
-route
-controller
-service
-repository
-middleware
-validation
-error all (try-global)
-Error Handling all App
-winston
-stream morgan
-docker
-jsDoc
-swagger
-e2e
-unit test
------------------

multi environment
docker
docker swarm
microservice
logging
error handling
unit test
e2e test
swagger
JsDoc
eslint
nginx
typescript

 - I used nginx for URL redirection
 - docker-swarm for rolling updates
 - Run multiple app (Microservice App)
 - multi-environment (production - development )
 - unit test For repository layer
 - E2e test



docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml down -v
docker stack deploy -c docker-compose.yml -c docker-compose.dev.yml express-app
docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml build
docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml  up -d --build
*/
