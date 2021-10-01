import { RootStore } from './stores';
import { serialize } from './persist';
import { createPersist } from './utils';
import { env } from './env';

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */

/**
 * Setup the root state.
 */
export function createStore(initialState = {}) {
  const store = RootStore.create(initialState, env);

  const persist = createPersist(store, { serialize });

  return { store, persist };
}
