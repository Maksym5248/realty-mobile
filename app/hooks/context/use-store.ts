import { useContext } from 'react';

import { RootStore } from '~/store';
import { RootStoreContext } from '~/context';

export const useStore = () => useContext<typeof RootStore>(RootStoreContext);
