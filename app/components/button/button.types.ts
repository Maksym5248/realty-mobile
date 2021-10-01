import React, { RefObject, ComponentPropsWithRef } from 'react';

import { ViewStyle, View } from 'react-native';
import { Button } from 'react-native-paper';

export type IButtonProps = Omit<ComponentPropsWithRef<typeof Button>, 'children'> & {
  title?: string;
  children?: React.ReactNode;
  contentStyle?: ViewStyle;
  ref?: RefObject<View>;
  testID: string;
};
