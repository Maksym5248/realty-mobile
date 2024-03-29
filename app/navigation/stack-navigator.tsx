import React from 'react';

import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { SCREENS } from '~/constants';
import { useLocale, useStore } from '~/hooks';
import * as screens from '~/screens';
import { colors } from '~/styles';

import { TabsNavigator } from './tabs-navigator';

const Stack = createNativeStackNavigator();

export const StackNavigator = observer(() => {
  const store = useStore();
  const { t } = useLocale();

  const params = {
    screenOptions: { headerShown: true, headerTintColor: colors.primary },
    initialRouteName: SCREENS.SIGN_IN,
  };

  function getHeaderTitle(route: Partial<Route<string, object>>) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? SCREENS.MAIN;

    switch (routeName) {
      case SCREENS.MAIN:
        return t('main.title');
      case SCREENS.SETTINGS:
        return t('settings.title');
      default:
        return 'Stub';
    }
  }

  return (
    store?.isInitialized && (
      <Stack.Navigator {...params}>
        {/* Authorization */}
        {!store.auth?.isAuthorized && (
          <>
            <Stack.Screen
              name={SCREENS.SIGN_IN}
              options={{
                title: t('sign_in.title'),
              }}
              component={screens.SignIn}
            />
            <Stack.Screen
              name={SCREENS.SIGN_UP}
              options={{
                title: t('sign_up.title'),
              }}
              component={screens.SignUp}
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
