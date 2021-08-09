jest.mock('reactotron-react-native', () => {
  return {
    trackGlobalErrors: jest.fn(),
    openInEditor: jest.fn(),
    setAsyncStorageHandler: () => ({
      configure: () => ({
        useReactNative: () => ({
          use: () => ({
            use: () => ({
              connect: () => ({
                createEnhancer: jest.fn(),
              }),
            }),
          }),
        }),
      }),
    }),
  };
});

// Tron.setAsyncStorageHandler(AsyncStorage)
// .configure({ host })
// .useReactNative({
//   storybook: true,
// })
// .use(trackGlobalErrors())
// .use(openInEditor())
// .connect();
