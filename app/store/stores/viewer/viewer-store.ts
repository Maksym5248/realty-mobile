import { types, Instance } from 'mobx-state-tree';

import { CurrentUserModel, ICurrentUser } from './current-user';
import { asyncAction } from '../../utils';

const Store = types
  .model('ViewerStore', {
    user: types.maybe(CurrentUserModel),
  })
  .actions((self) => ({
    setUser(user: ICurrentUser) {
      self.user = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      };
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
