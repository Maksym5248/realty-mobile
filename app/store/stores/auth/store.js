// @flow
import { types as t } from 'mobx-state-tree';

import { screens, secureStorage } from '~/constants';
import {
  NavigationService,
  Google,
  SecureStore,
  PushNotification,
  Apple,
  Facebook,
  ModalService,
  PermissionsService,
} from '~/services';
import { error } from '~/utils';

import { asyncAction } from '../../utils';

export const AuthStore = t
  .model('Auth', {
    isAuthorized: false,
  })
  .actions((store) => ({
    setAuthorizationStatus(status) {
      store.isAuthorized = status;
    },
  }));
