import { Schema, Document } from "mongoose";

/**
 * Interface representing the timestamps for a Mongoose document.
 */
interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Adds `createdAt` and `updatedAt` fields to a Mongoose schema, and sets up a pre-save hook to manage them.
 * 
 * @param {any} schema - The Mongoose schema to which timestamps will be added.
 * This function mutates the schema to add the `createdAt` and `updatedAt` fields.
 * 
 * @template T - The type of the document.
 */
function addTimestamps<T extends Document>(schema: any): void {
    // Extend the schema with createdAt and updatedAt fields
    schema.add({
        createdAt: {
            type: Date,
            required: true,
            default: Date.now, // Default to the current date and time
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now, // Default to the current date and time
        },
    });

    /**
     * Pre-save hook that updates the `updatedAt` field and initializes `createdAt` if not already set.
     */
    schema.pre("save", function (this: any, next: () => void) {
        const now = Date.now();

        this.updatedAt = now; // Always set `updatedAt` to the current date/time

        // Set `createdAt` only if it doesn't already have a value
        if (!this.createdAt) {
            this.createdAt = now;
        }

        // Proceed with the save operation
        next();
    });
}

export { Timestamps, addTimestamps };
