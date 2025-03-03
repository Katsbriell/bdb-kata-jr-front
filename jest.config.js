module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/app/$1',
  },
};
