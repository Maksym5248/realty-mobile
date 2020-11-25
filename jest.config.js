module.exports = {
  preset: "react-native",
  setupFiles: [
    "./node_modules/react-native/jest/setup.js",
    "<rootDir>/test/setup.js"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-native|@react-navigation|@react-native-community)"
  ]
}
