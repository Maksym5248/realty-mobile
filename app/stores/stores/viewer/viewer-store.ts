import { types, Instance } from 'mobx-state-tree';

import { CurrentUser, ICurrentUser, normalizeCurrentUser } from './entities';
import { asyncAction } from '../../utils';

const Store = types
  .model('ViewerStore', {
    // collection
    // list
    // filteredList
    user: types.maybe(CurrentUser),
  })
  .actions((self) => ({
    setUser(user: ICurrentUser) {
      self.user = normalizeCurrentUser(user);
    },
    removeUser() {
      self.user = undefined;
    },
  }));

const fetchUser = asyncAction<Instance<typeof Store>>(() => {
  return async ({ flow, self, env }) => {
    try {
      flow.start();

      const res = await env.Api.getCurrentUser();
      self.setUser(res.data);

      flow.success();
    } catch (e) {
      flow.failed(e);
    }
  };
});

export const ViewerStore = Store.props({
  fetchUser,
});
