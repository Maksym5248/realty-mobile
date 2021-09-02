module.exports = {
  preset: 'react-native',
  setupFiles: [
    './node_modules/react-native/jest/setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/test/setup.ts',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|@react-navigation|@react-native-community)',
  ],
};
