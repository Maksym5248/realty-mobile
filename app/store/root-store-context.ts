import { createContext, useContext } from 'react';

import { RootStore } from './stores';

/**
 * Create a context we can use to
 * - Provide access to our stores from our root component
 * - Consume stores in our screens (or other components, though it's
 *   preferable to just connect screens)
 */
export const RootStoreContext = createContext<RootStore>({});

/**
 * The provider our root component will use to expose the root store
 */
export const RootStoreProvider = RootStoreContext.Provider;
export const RootStoreConsumer = RootStoreContext.Consumer;

/**
 * A hook that screens can use to gain access to our stores, with
 * `const { someStore, someOtherStore } = useStore()`,
 * or less likely: `const rootStore = useStore()`
 */
export const useStore = () => useContext<RootStore>(RootStoreContext);
