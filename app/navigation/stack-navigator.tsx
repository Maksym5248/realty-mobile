import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { observer } from 'mobx-react';

import { screens } from '~/constants';
import { useLocalization } from '~/localization';

import * as components from '~/screens';
import { useStore } from '~/store';
import { colors } from '~/styles';

import { TabsNavigator } from './tabs-navigator';

const Stack = createNativeStackNavigator();

export const StackNavigator = observer(() => {
  const store = useStore();
  const { t } = useLocalization();

  const params = {
    screenOptions: { headerShown: true, headerTintColor: colors.primary },
    initialRouteName: screens.SignIn,
  };

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? screens.Main;

    switch (routeName) {
      case screens.Main:
        return t('main.title');
      case screens.Settings:
        return t('settings.title');
      case 'stub1':
      case 'stub2':
        return 'Stub';
    }
  }

  return (
    store?.isInitialized && (
      <Stack.Navigator {...params}>
        {/* Authorization */}
        {!store?.auth?.isAuthorized && (
          <>
            <Stack.Screen
              name={screens.SignIn}
              options={{
                title: t('sign_in.title'),
              }}
              component={components.SignIn}
            />
            <Stack.Screen
              name={screens.SignUp}
              options={{
                title: t('sign_up.title'),
              }}
              component={components.SignUp}
            />
          </>
        )}

        {/* Main */}
        {store?.auth?.isAuthorized && (
          <>
            <Stack.Screen
              name="TabsNavigator"
              options={({ route }) => ({
                title: getHeaderTitle(route),
                replaceAnimation: 'push',
              })}
              component={TabsNavigator}
            />
          </>
        )}
      </Stack.Navigator>
    )
  );
});
