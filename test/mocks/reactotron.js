jest.mock('reactotron-react-native', () => {
  return {
    configure: jest.fn(),
    useReactNative: jest.fn(),
    use: jest.fn(),
    connect: jest.fn(),
    setAsyncStorageHandler: jest.fn(),
  };
});
