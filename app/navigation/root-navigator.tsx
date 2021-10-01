import React, { forwardRef } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { NavigationContainerRef } from '@react-navigation/core';

import { StackNavigator } from './stack-navigator';

export const RootNavigation = forwardRef(
  (props, ref: React.RefObject<NavigationContainerRef<any>>) => (
    <NavigationContainer ref={ref} {...props}>
      <StackNavigator />
    </NavigationContainer>
  ),
);
