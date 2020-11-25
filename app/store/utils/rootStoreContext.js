// @flow
import React, { createContext, useContext } from 'react';
import { RootStore } from '../stores/rootStore';
import { observer } from 'mobx-react';

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
 * `const { someStore, someOtherStore } = useStores()`,
 * or less likely: `const rootStore = useStores()`
 */
export const useStores = () => useContext<RootStore>(RootStoreContext);
export const withStores = (mapStateToProps: (value: Object) => Object = (value) => null) => (
  Component: any,
) => (props: Object) => {
  const store = useStores();
  const storeProps = mapStateToProps(store) || {};
  const ObservedComponent = observer(Component);
  return <ObservedComponent {...props} {...storeProps} />;
};
