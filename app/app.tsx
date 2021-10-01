import 'react-native-gesture-handler';

import React, { useEffect, useCallback } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

import { RootNavigation } from '~/navigation';
import { createStore } from '~/store';
import { Navigation } from '~/services';
import { AlertProvider, ModalProvider, LocalizationProvider } from '~/containers';
import { modals } from '~/modals';
import { theme } from '~/styles';
import { RootStoreContext } from '~/context';

const { store, persist } = createStore();

export const App = observer(() => {
  const initStore = useCallback(async () => {
    try {
      await persist.rehydrate();
    } catch (err) {
      await persist.purge();
    } finally {
      console.tron.trackMstNode(store);

      store.init();
    }
  }, []);

  useEffect(() => {
    initStore();
    return () => store.removeAllListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocalizationProvider>
      <RootStoreContext.Provider value={store}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
            <RootNavigation ref={Navigation.init} />
            <ModalProvider modals={modals} />
            <AlertProvider />
          </PaperProvider>
        </SafeAreaProvider>
      </RootStoreContext.Provider>
    </LocalizationProvider>
  );
});
