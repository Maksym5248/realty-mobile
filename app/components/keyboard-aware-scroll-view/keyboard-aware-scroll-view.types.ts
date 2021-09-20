import { ComponentPropsWithRef, ReactNode } from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export type KeyboardAwareScrollViewProps = Omit<
  ComponentPropsWithRef<typeof KeyboardAwareScrollView>,
  'children'
> & {
  children?: ReactNode;
};
