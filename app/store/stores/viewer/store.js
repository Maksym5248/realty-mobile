import { types as t } from 'mobx-state-tree';

import { SecureStore } from '~/services';
import { secureStorage } from '~/constants';

import { CurrentUserModel } from './CurrentUser';
import { asyncAction } from '../../utils';

export const ViewerStore = t
  .model('Viewer', {
    user: t.maybe(CurrentUserModel),
  })
  .actions((store) => ({
    setUser(user) {
      const newUser = Object.assign({}, user);
      store.user = newUser;
    },
  }));
