module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/unit_test/**/*.test.ts'],
    transform: {
        '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Add this
};
