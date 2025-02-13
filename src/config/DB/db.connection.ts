import config from "../config"
import mongoose from "mongoose";


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
    async connect(): Promise<void> {
        let databaseUrl = `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}/?authSource=admin`;
        if (config.nodeEnv === 'test') {
            databaseUrl = 'mongodb://localhost:27017/Magic'; // Hardcoded for now.
        }


        if (!databaseUrl) {
            console.error("DATABASE_URL is not defined");
            process.exit(1); // Exit process if the database URL is not found
        }

        console.log(`Connecting to database: ${databaseUrl}`);

        try {
            await mongoose.connect(databaseUrl);
            console.log("Database connection successful");
        } catch (err) {
            console.error("Database connection error:", err);
            process.exit(1);  // Ensure the process exits on connection failure
        }
    }

    /**
     * Disconnects from the MongoDB database.
     * 
     * @returns {void} This method does not return anything.
     * @throws {Error} If the disconnection fails, an error will be logged.
     */
    async disconnect(): Promise<void> {
        try {
            await mongoose
                .disconnect();
            console.log("Database disconnected successfully");
        } catch (err) {
            console.error("Error disconnecting from the database:", err);
        }
    }

}

// Export a single instance of the AppDataSource class
/**
 * A singleton instance of the AppDataSource class.
 * Used to manage the database connection across the application.
 */
export default new AppDataSource();
