import React from 'react';

import { KeyboardAwareScrollView as KeyboardViewRN } from 'react-native-keyboard-aware-scroll-view';

import { KeyboardAwareScrollViewProps } from './keyboard-aware-scroll-view.types';

export const KeyboardAwareScrollView = ({ children, ...rest }: KeyboardAwareScrollViewProps) => (
  <KeyboardViewRN bounces={false} keyboardShouldPersistTaps="handled" {...rest}>
    {children}
  </KeyboardViewRN>
);
