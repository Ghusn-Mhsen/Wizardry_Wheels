import * as dotenv from 'dotenv';

// Load environment-specific .env file
// dotenv.config({
//   path: `./${process.env.NODE_ENV}.env`,
// });
dotenv.config({
  path: `./${process.env.NODE_ENV}.env`,
});


// Define an interface for the config structure
/**
 * Interface representing the structure of the configuration object.
 * Contains properties for server settings, logging, and MongoDB connection details.
 * 
 * @interface Config
 */
interface Config {
  /**
   * the Environment (Development-production-test) of The App 
   * 
   * @type {string | undefined}
   */
  nodeEnv: string | undefined

  /**
   * The port on which the server will run.
   * 
   * @type {string | undefined}
   */
  port: string | undefined;

  /**
   * The path where log files will be saved.
   * 
   * @type {string | undefined}
   */
  log_file_path: string | undefined;

  /**
   * The logging level to be used (e.g., "info", "debug", "error").
   * 
   * @type {string | undefined}
   */
  log_level: string | undefined;

  /**
   * MongoDB connection details.
   * 
   * @property {string | undefined} host - The host where the MongoDB instance is located.
   * @property {string | undefined} port - The port on which MongoDB is running.
   * @property {string | undefined} user - The username for MongoDB authentication.
   * @property {string | undefined} password - The password for MongoDB authentication.
   */
  mongo: {
    host: string | undefined;
    port: string | undefined;
    user: string | undefined;
    password: string | undefined;
  };
}

// Create a config object that matches the interface
/**
 * The configuration object that holds all environment-based settings.
 * This object is populated by loading environment variables from the `.env` file.
 * 
 * @constant {Config}
 */
const config: Config = {
  nodeEnv: process.env.NODE_ENV,
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
export default config;
