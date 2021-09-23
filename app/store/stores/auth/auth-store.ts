import { types, flow as mstFlow, Instance } from 'mobx-state-tree';

import { SECURE_STORAGE } from '~/constants';
import { Alert } from '~/services';
import { t } from '~/localization';
import { IApiAuth, ISignInParams, ISignUpParams } from '~/api';

import { asyncAction, getRoot, getEnv } from '../../utils';

interface IStore extends Instance<typeof Store> {}

const Store = types
  .model('AuthStore', {
    isAuthorized: false,
  })
  .actions((self) => ({
    setAuthorizationStatus(status: boolean) {
      self.isAuthorized = status;
    },
  }))
  .actions((self) => ({
    authorize: mstFlow(function* ({ user, tokens }: IApiAuth) {
      const root = getRoot(self);
      const env = getEnv(self);

      env.SecureStorage.set(SECURE_STORAGE.AUTH_TOKEN, tokens);

      root.viewer.setUser(user);
      self.setAuthorizationStatus(true);
    }),
  }));

const signUp = asyncAction<IStore>((params: ISignUpParams) => async ({ flow, self, env }) => {
  try {
    flow.start();

    const { data } = await env.Api.signUp(params);
    await self.authorize(data);

    flow.success();
  } catch (e) {
    flow.failed(e);
    Alert.show(t(flow.errorMessage));
  }
});

const signIn = asyncAction<IStore>(function (params: ISignInParams) {
  return async ({ flow, self, env }) => {
    try {
      flow.start();

      const { data } = await env.Api.signIn(params);

      await self.authorize(data);

      flow.success();
    } catch (e) {
      flow.failed(e);
      Alert.show(t(flow.errorMessage));
    }
  };
});

const signOut = asyncAction<IStore>(() => {
  return async ({ flow, self, root, env }) => {
    try {
      flow.start();
      const tokens = await env.SecureStorage.get(SECURE_STORAGE.AUTH_TOKEN);

      await env.Api.signOut({ refreshToken: tokens.refresh.token });
      await env.SecureStorage.remove(SECURE_STORAGE.AUTH_TOKEN);

      self.setAuthorizationStatus(false);
      root.viewer.removeUser();
      flow.success();
    } catch (e) {
      flow.failed(e);
    }
  };
});

export const AuthStore = Store.props({
  signUp,
  signIn,
  signOut,
});
