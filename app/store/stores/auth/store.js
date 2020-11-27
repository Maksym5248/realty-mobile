// @flow
import { types as t } from 'mobx-state-tree';

import { secureStorage } from '~/constants';
import { SecureStore, Alert } from '~/services';
import { error } from '~/utils';

import { asyncAction } from '../../utils';

export const AuthStore = t
  .model('Auth', {
    isAuthorized: false,

    authenticate: asyncAction(authenticate),
    signUp: asyncAction(signUp),
    signIn: asyncAction(signIn),
    signOut: asyncAction(signOut),
  })
  .actions((store) => ({
    setAuthorizationStatus(status) {
      store.isAuthorized = status;
    },
  }));

function authenticate({ tokens, user }) {
  return async (flow, store, root) => {
    await SecureStore.set(secureStorage.AUTH_TOKEN, tokens);

    root.viewer.setUser(user);

    store.setAuthorizationStatus(true);
  };
}

function signUp(params) {
  return async (flow, store) => {
    try {
      flow.start();
      const { data } = await flow.Api.signUp(params);
      await store.authenticate.run(data);
      flow.success();
    } catch (e) {
      Alert.show(error.get(e));
      flow.failed(e);
    }
  };
}

function signIn(params) {
  return async (flow, store, root) => {
    try {
      flow.start();

      const { data } = await flow.Api.signIn(params);

      await store.authenticate.run(data);

      flow.success();
    } catch (e) {
      Alert.show(error.get(e));
      flow.failed(e);
    }
  };
}

function signOut() {
  return async (flow, store, root) => {
    try {
      flow.start();
      const tokens = await SecureStore.get(secureStorage.REFRESH_AUTH_TOKEN);

      await flow.Api.signOut({ refreshToken: tokens.refresh.token });
      await SecureStore.remove(secureStorage.AUTH_TOKEN);

      store.setAuthorizationStatus(false);
      root.viewer.setUser(null);

      flow.success();
    } catch (e) {
      flow.failed(e);
    }
  };
}
