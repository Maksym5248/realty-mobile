// @flow
import { types, getParent, getRoot } from 'mobx-state-tree';
import { asyncModel } from './createFlow';

export function asyncAction(action: Function, auto: boolean, throwError: boolean = true) {
  const flowModel = types.compose(
    asyncModel,
    types.model({}).actions((store) => ({
      async auto(promise) {
        try {
          store.start();

          await promise();

          store.success();
        } catch (err) {
          store.failed(err, throwError);
        }
      },

      run: (...args) => {
        const promise = () => action(...args)(store, getParent(store), getRoot(store));

        if (auto) {
          return store.auto(promise);
        }

        return promise();
      },
    })),
  );

  return types.optional(flowModel, {});
}
