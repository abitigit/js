// jest.config.js (javascript file)
module.exports = {
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
     },
  resetMocks: true,
  reporters: [["<rootDir>/src/tests/test-reporter/index.js", { useReporter: true }]],
  rootDir: ""
};
