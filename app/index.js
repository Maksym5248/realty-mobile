// @flow
import 'react-native-gesture-handler';
import './reactotron';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { observer } from 'mobx-react-lite';

import { RootNavigation } from '~/navigation';
import { LocalizationProvider } from '~/localization';
import { RootStoreProvider, createStore } from '~/store';
import { NavigationService, ModalProvider } from '~/services';
import { modals } from '~/modals';

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
      <RootStoreProvider>
        <SafeAreaProvider>
          <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
          <RootNavigation ref={NavigationService.init} />
          <ModalProvider modals={modals} />
        </SafeAreaProvider>
      </RootStoreProvider>
    </LocalizationProvider>
  );
});

export default App;
