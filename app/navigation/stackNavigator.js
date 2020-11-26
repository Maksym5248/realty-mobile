import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { observer } from 'mobx-react';

import { screens } from '~/constants';
import { useLocalization } from '~/localization';

import * as components from '~/screens';
import { useStores } from '~/store';

const Stack = createNativeStackNavigator();

export const StackNavigator = observer(() => {
  const store = useStores();
  const { t } = useLocalization();

  const params = {
    screenOptions: { headerShown: true },
    initialRouteName: screens.SignUp,
  };

  return (
    <Stack.Navigator {...params}>
      {/* Authorization */}

      {!store?.auth?.isAuthorized && (
        <>
          <Stack.Screen
            name={screens.SignUp}
            options={{
              title: t('sign_up.title'),
            }}
            component={components.SignUp}
          />
        </>
      )}
    </Stack.Navigator>
  );
});
