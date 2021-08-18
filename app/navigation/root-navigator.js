import React, { forwardRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from './stack-navigator';

export const RootNavigation = forwardRef((props, ref) => {
  return (
    <NavigationContainer ref={ref}>
      <StackNavigator name="Stack" />
    </NavigationContainer>
  );
});
