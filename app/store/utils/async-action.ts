import { types, getParent, getEnv, Instance } from 'mobx-state-tree';

import { AsyncModel } from './create-flow';
import { getRoot } from './get-root';
import { IEnv } from '../env';
import { IRootStore } from '../stores/root-store';

export interface IFlow extends Instance<typeof AsyncModel> {}

export interface IAsyncAction<T> {
  flow: Instance<typeof AsyncModel>;
  env: IEnv;
  self: T;
  root: IRootStore;
}

export function asyncAction<T>(
  action: (...args: any[]) => (value: IAsyncAction<T>) => any,
  auto?: boolean,
  throwError: boolean = true,
) {
  const FlowModel = AsyncModel.named('FlowModel')
    .actions((self) => ({
      async auto(promise: () => Promise<any>) {
        try {
          self.start();

          await promise();

          self.success();
        } catch (err) {
          self.failed(err, throwError);
        }
      },
    }))
    .actions((self) => ({
      run: (...args: any[]): Promise<any> => {
        const promise = () =>
          action(...args)({
            flow: self,
            self: getParent(self) as T,
            root: getRoot(self),
            env: getEnv(getRoot(self)) as IEnv,
          });

        if (auto) {
          return self.auto(promise);
        }

        return promise();
      },
    }));

  return types.optional(FlowModel, {});
}
