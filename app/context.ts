import { createContext } from 'react';

import { Instance } from 'mobx-state-tree';

import { RootStore } from '~/store';

export const RootStoreContext = createContext<Instance<typeof RootStore>>(null);
export const TranslateContext = createContext({});
