import { ReactNode } from 'react';

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({ children }: { children: ReactNode }) => children;
  return { KeyboardAwareScrollView };
});
