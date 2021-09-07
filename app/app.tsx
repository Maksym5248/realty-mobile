import './reactotron';
import 'react-native-gesture-handler';

import React, { useEffect } from 'react';

import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

import { RootNavigation } from '~/navigation';
import { LocalizationProvider } from '~/localization';
import { createStore } from '~/store';
import { NavigationService } from '~/services';
import { AlertProvider, ModalProvider } from '~/containers';
import { modals } from '~/modals';
import { theme } from '~/styles';
import { RootStoreContext } from '~/context';

enableScreens();

const { store, persist } = createStore();

export const App = observer(() => {
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
      <RootStoreContext.Provider value={store}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
            <RootNavigation ref={NavigationService.init} />
            <ModalProvider modals={modals} />
            <AlertProvider />
          </PaperProvider>
        </SafeAreaProvider>
      </RootStoreContext.Provider>
    </LocalizationProvider>
  );
});
