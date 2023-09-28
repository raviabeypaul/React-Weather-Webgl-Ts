module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  coveragePathIgnorePatterns: ["<rootDir>/src/test"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"]
};
