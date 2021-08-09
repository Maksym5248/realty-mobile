// @flow
import React from 'react';
import { KeyboardAwareScrollView as KeyboardViewRN } from 'react-native-keyboard-aware-scroll-view';
import { type KeyboardAwareScrollViewProps } from './types';

export const KeyboardAwareScrollView = ({ children, ...props }: KeyboardAwareScrollViewProps) => {
  return (
    // $FlowFixMe
    <KeyboardViewRN bounces={false} keyboardShouldPersistTaps="handled" {...props}>
      {children}
    </KeyboardViewRN>
  );
};
