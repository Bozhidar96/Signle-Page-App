module.exports = {
  preset: "ts-jest/presets/js-with-ts-esm",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
};
