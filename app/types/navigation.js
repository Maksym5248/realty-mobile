// @flow
import { type ElementType } from 'react';

type NavigationOptions = {
  headerRight: () => any,
};

export type Navigation = {
  navigate: (screenName: string, params: Object) => void,
  goBack: () => void,
  setOptions: (options: NavigationOptions) => ElementType,
};
