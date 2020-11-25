jest.mock('react-native-localize', () => {
  return {
    findBestAvailableLanguage: ([language = 'uk']) => ({
      languageTag: language,
      isRTL: false,
    }),
  };
});
