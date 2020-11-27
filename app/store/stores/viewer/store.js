import { types as t } from 'mobx-state-tree';

import { SecureStore } from '~/services';
import { secureStorage } from '~/constants';

import { CurrentUserModel } from './CurrentUser';
import { asyncAction } from '../../utils';

export const ViewerStore = t
  .model('Viewer', {
    user: t.maybe(CurrentUserModel),

    getUser: asyncAction(getUser),
  })
  .actions((store) => ({
    setUser(user) {
      const newUser = Object.assign({}, user);
      store.user = newUser;
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
