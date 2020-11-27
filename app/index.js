// @flow
import 'react-native-gesture-handler';
import './reactotron';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { Provider as PaperProvider } from 'react-native-paper';

import { RootNavigation } from '~/navigation';
import { LocalizationProvider } from '~/localization';
import { RootStoreProvider, createStore } from '~/store';
import { Navigation, ModalProvider, AlertProvider } from '~/services';
import { modals } from '~/modals';
import { theme } from '~/styles';

enableScreens();

const { store, persist } = createStore();

const App = observer(() => {
  useEffect(() => {
    (async () => {
      try {
        await persist.rehydrate();
      } catch (err) {
        await persist.purge();
      }

      store.init();
    })();
  }, []);

  return (
    <LocalizationProvider>
      <RootStoreProvider value={store}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
            <RootNavigation ref={Navigation.init} />
            <ModalProvider modals={modals} />
            <AlertProvider />
          </PaperProvider>
        </SafeAreaProvider>
      </RootStoreProvider>
    </LocalizationProvider>
  );
});

export default App;
