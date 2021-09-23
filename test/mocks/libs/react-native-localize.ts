jest.mock('react-native-localize', () => ({
  findBestAvailableLanguage: ([language = 'uk']) => ({
    languageTag: language,
    isRTL: false,
  }),
}));
