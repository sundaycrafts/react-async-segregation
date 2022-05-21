module.exports = {
  testEnvironment: "jest-environment-jsdom",

  moduleFileExtensions: ["js", "ts", "tsx"],

  /* Make jest run faster
   * see https://swc.rs/docs/usage/jest#usage */
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", { configFile: ".test.swcrc" }],
  },

  /**
   * Extends Jest with custom matchers with @testing-library/jest-dom
   * such as `.toBeInTheDocument()`
   */
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  globals: {
    "ts-jest": {
      tsConfigFile: "test.tsconfig.json",
    },
  },
};
