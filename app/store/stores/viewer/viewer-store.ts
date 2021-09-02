import { types as t } from 'mobx-state-tree';

import { CurrentUserModel } from './current-user';
import { asyncAction } from '../../utils';

export const ViewerStore = t
  .model('Viewer', {
    user: t.maybe(CurrentUserModel),

    getUser: asyncAction(getUser),
  })
  .actions((store) => ({
    setUser(user) {
      const newUser = { ...user };
      store.user = newUser;
    },
    removeUser() {
      store.user = undefined;
    },
  }));

function getUser(retry) {
  return async (flow, store, root) => {
    try {
      flow.start(retry);

      const res = await flow.Api.getCurrentUser();

      store.setUser(res.data);

      flow.success();
    } catch (e) {
      flow.failed(e);
    }
  };
}
