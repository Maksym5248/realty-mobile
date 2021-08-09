// @flow
import { types, flow, getParent, getRoot, getEnv } from 'mobx-state-tree';
import _ from 'lodash';

const ErrorModel = types.model({
  message: '',
  status: types.maybeNull(types.number),
  reason: types.maybeNull(types.string),
});

export const asyncModel = types
  .model({
    inProgress: false,
    inProgressRetry: false,
    error: types.optional(types.maybeNull(ErrorModel), null),
    hasEverBeenRan: false,
  })
  .views((store) => ({
    get errorMessage() {
      return _.get(store, 'error.message', null);
    },

    get isError() {
      return Boolean(store.error);
    },

    get Api() {
      return getEnv(getRoot(store)).Api;
    },

    get SecureStore() {
      return getEnv(getRoot(store)).SecureStore;
    },

    get canBeRun() {
      return !store.error && !store.inProgress;
    },

    get inProgressAgain() {
      return store.inProgress && store.hasEverBeenRan;
    },
  }))
  .actions((store) => ({
    start(retry = false) {
      if (retry) {
        store.inProgressRetry = true;
      } else {
        store.inProgress = true;
      }

      store.error = null;
    },

    success() {
      if (!store.hasEverBeenRan) {
        store.hasEverBeenRan = true;
      }

      if (store.inProgressRetry) {
        store.inProgressRetry = false;
      } else {
        store.inProgress = false;
      }
    },

    failed(err, throwError) {
      if (!store.hasEverBeenRan) {
        store.hasEverBeenRan = true;
      }

      if (__DEV__ && process.env.JEST_WORKER_ID === undefined) {
        // eslint-disable-next-line global-require
        const Reactotron = require('reactotron-react-native').default;
        const { message, stack } = err;
        if (stack) {
          Reactotron.error(message, stack);
        } else {
          Reactotron.log(`Error:\n${message}`);
        }
      }

      if (store.inProgressRetry) {
        store.inProgressRetry = false;
      } else {
        store.inProgress = false;
      }

      store.error = {
        message: _.get(err, 'response.data.message', err.message),
        status: _.get(err, 'response.status', null),
        reason: _.get(err, 'response.data.reason', null),
      };

      if (throwError) {
        throw err;
      }
    },
  }));

export function createFlow(flowDefinition: (any) => any) {
  const flowModel = types.compose(
    asyncModel,
    types.model({}).actions((store) => ({
      run: flow((...args) => flowDefinition(...args)(store, getParent(store), getRoot(store))),
    })),
  );

  return types.optional(flowModel, {});
}
