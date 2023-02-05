/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'jsdom',
  // testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    // '**/*.{js,jsx}',
    'src/app/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['json', 'lcov', 'text'],
};
