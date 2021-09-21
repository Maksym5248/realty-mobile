import { types, flow, getParent, getRoot, getEnv } from 'mobx-state-tree';
import _ from 'lodash';

import { error } from '~/utils';

const integrateDevTools = (err: Error) => {
  if (__DEV__ && process.env.JEST_WORKER_ID === undefined) {
    const Reactotron = require('reactotron-react-native').default;
    const { message, stack } = err;
    if (stack) {
      Reactotron.error(message, stack);
    } else {
      Reactotron.log(`Error:\n${message}`);
    }
  }
};

const ErrorModel = types.model({
  message: '',
  status: types.maybeNull(types.number),
  reason: types.maybeNull(types.string),
});

export const AsyncModel = types
  .model({
    inProgress: false,
    error: types.optional(types.maybeNull(ErrorModel), null),
    hasEverBeenRan: false,
  })
  .views((self) => ({
    get isError() {
      return Boolean(self.error);
    },

    get errorMessage(): string | null {
      return _.get(self, 'error.message', null);
    },

    get inProgressAgain() {
      return self.inProgress && self.hasEverBeenRan;
    },

    get canBeRun() {
      return !self.error && !self.inProgress;
    },
  }))
  .actions((self) => ({
    start() {
      self.inProgress = true;
      self.error = null;
    },

    success() {
      if (!self.hasEverBeenRan) {
        self.hasEverBeenRan = true;
      }

      self.inProgress = false;
    },

    failed(err: Error, throwError?: boolean) {
      if (!self.hasEverBeenRan) {
        self.hasEverBeenRan = true;
      }

      integrateDevTools(err);

      self.inProgress = false;

      self.error = {
        message: error.getMessage(err),
        status: _.get(err, 'response.status', null),
        reason: _.get(err, 'response.data.reason', null),
      };

      if (throwError) {
        throw err;
      }
    },
  }));

export function createFlow(flowDefinition: (...args: any[]) => any) {
  const FlowModel = AsyncModel.named('FlowModel').actions((store) => ({
    run: flow((...args) =>
      flowDefinition(...args)({
        store,
        parent: getParent(store),
        root: getRoot(store),
        env: getEnv(getRoot(store)),
      }),
    ),
  }));

  return types.optional(FlowModel, {});
}
