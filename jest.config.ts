export default {
  // moduleFileExtensions: ['ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/tests/**/*.spec.ts',
    '**/tests/**/*.test.ts',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'dist',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/components/alert/services/index.ts',
  ],
};
