import { ElementType } from 'react';

interface NavigationOptions {
  headerRight: () => any;
}

export interface Navigation {
  navigate: (screenName: string, params: Object) => void;
  goBack: () => void;
  setOptions: (options: NavigationOptions) => ElementType;
}
