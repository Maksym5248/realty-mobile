// @flow
import {
  types as t, flow as mstFlow, getRoot, getEnv,
} from 'mobx-state-tree';

import { secureStorage } from '~/constants';
import { Alert } from '~/services';
import { error } from '~/utils';

import { asyncAction } from '../../utils';

export const AuthStore = t
  .model('Auth', {
    isAuthorized: false,

    signUp: asyncAction(signUp),
    signIn: asyncAction(signIn),
    signOut: asyncAction(signOut),
  })
  .actions((store) => ({
    setAuthorizationStatus(status) {
      store.isAuthorized = status;
    },
    authorize: mstFlow(async ({ user, tokens }) => {
      const root = getRoot(store);
      const env = getEnv(store);

      env.SecureStore.set(secureStorage.AUTH_TOKEN, tokens);
      root.viewer.setUser(user);
      store.setAuthorizationStatus(true);
    }),
  }));

function signUp(params) {
  return async (flow, store) => {
    try {
      flow.start();

      const { data } = await flow.Api.signUp(params);

      await store.authorize(data);

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

      await store.authorize(data);

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
      const tokens = await flow.SecureStore.get(secureStorage.AUTH_TOKEN);

      flow.Api.signOut({ refreshToken: tokens.refresh.token });
      await flow.SecureStore.remove(secureStorage.AUTH_TOKEN);

      store.setAuthorizationStatus(false);
      root.viewer.removeUser();

      flow.success();
    } catch (e) {
      flow.failed(e);
    }
  };
}
