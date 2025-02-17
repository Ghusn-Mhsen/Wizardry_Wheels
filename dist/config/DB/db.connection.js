"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Class responsible for managing the database connection.
 * Provides methods to connect to and disconnect from the MongoDB database.
 */
class AppDataSource {
    /**
     * Constructor for the AppDataSource class.
     * Initializes the database connection instance.
     */
    constructor() {
        console.log("Database class constructor called");
    }
    /**
     * Connects to the MongoDB database using Mongoose.
     *
     * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
     * @throws {Error} If the connection fails, the process will exit with an error.
     */
    async connect() {
        const databaseUrl = `mongodb://${config_1.default.mongo.user}:${config_1.default.mongo.password}@${config_1.default.mongo.host}:${config_1.default.mongo.port}/?authSource=admin`;
        //const databaseUrl = 'mongodb://localhost:27017/Magic'; // Hardcoded for now.
        if (!databaseUrl) {
            console.error("DATABASE_URL is not defined");
            process.exit(1); // Exit process if the database URL is not found
        }
        console.log(`Connecting to database: ${databaseUrl}`);
        try {
            await mongoose_1.default.connect(databaseUrl);
            console.log("Database connection successful");
        }
        catch (err) {
            console.error("Database connection error:", err);
            process.exit(1); // Ensure the process exits on connection failure
        }
    }
    /**
     * Disconnects from the MongoDB database.
     *
     * @returns {void} This method does not return anything.
     * @throws {Error} If the disconnection fails, an error will be logged.
     */
    async disconnect() {
        try {
            await mongoose_1.default
                .disconnect();
            console.log("Database disconnected successfully");
        }
        catch (err) {
            console.error("Error disconnecting from the database:", err);
        }
    }
}
// Export a single instance of the AppDataSource class
/**
 * A singleton instance of the AppDataSource class.
 * Used to manage the database connection across the application.
 */
exports.default = new AppDataSource();
