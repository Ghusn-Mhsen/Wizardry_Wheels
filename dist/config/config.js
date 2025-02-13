"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
// Load environment-specific .env file
// dotenv.config({
//   path: `./${process.env.NODE_ENV}.env`,
// });
dotenv.config({
    path: `./${process.env.NODE_ENV}.env`,
});
// Create a config object that matches the interface
/**
 * The configuration object that holds all environment-based settings.
 * This object is populated by loading environment variables from the `.env` file.
 *
 * @constant {Config}
 */
const config = {
    port: process.env.PORT,
    log_file_path: process.env.LOG_FILE_PATH,
    log_level: process.env.LOG_LEVEL,
    mongo: {
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "example",
        host: process.env.DB_HOST || "mongo",
        port: process.env.DB_PORT || "27017"
    }
};
exports.default = config;
