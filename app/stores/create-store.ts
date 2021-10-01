import { RootStore } from './stores';
import { serialize } from './persist';
import { createPersist } from './utils';
import { env } from './env';

/**
 * Setup the root state.
 */
export function createStore(initialState = {}) {
  const store = RootStore.create(initialState, env);

  const persist = createPersist(store, { serialize });

  return { store, persist };
}
