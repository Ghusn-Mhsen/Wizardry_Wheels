import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Use ts-jest for TypeScript support
    testEnvironment: 'node', // Use Node.js environment for backend testing
    moduleFileExtensions: ['ts', 'js', 'json'],
    roots: ['<rootDir>/tests'], // Specify where tests are located
    testMatch: ['<rootDir>/tests/e2e_test/**/*.e2e.test.ts'],// Match test files
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/"
    ]
};

export default config;
