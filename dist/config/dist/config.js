"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
// Load environment-specific .env file
// dotenv.config({
//   path: `./${process.env.NODE_ENV}.env`,
// });
dotenv.config({
    path: "./" + process.env.NODE_ENV + ".env"
});
// Create a config object that matches the interface
/**
 * The configuration object that holds all environment-based settings.
 * This object is populated by loading environment variables from the `.env` file.
 *
 * @constant {Config}
 */
var config = {
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
console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log(config);
exports["default"] = config;
