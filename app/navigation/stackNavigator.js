import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { observer } from 'mobx-react';

import { screens } from '~/constants';
import { Spinner } from '~/components';

import * as components from '~/screens';
import { useStores } from '~/store';

import { styles } from '~/styles';

const Stack = createNativeStackNavigator();

export const StackNavigator = observer(() => {
  const store = useStores();

  const params = {
    screenOptions: { headerShown: true },
    initialRouteName: screens.SignUp,
  };

  return (
    <Stack.Navigator {...params}>
      {/* Authorization */}

      {!store?.auth?.isAuthorized && (
        <>
          <Stack.Screen name={screens.SignUp} component={components.SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
});
