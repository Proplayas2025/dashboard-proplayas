module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    // Opcional: mock de CSS y archivos estáticos
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/test/__mocks__/fileMock.js"
  },
  transformIgnorePatterns: [
    "/node_modules/"
  ],
};