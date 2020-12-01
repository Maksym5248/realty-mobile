import { types, flow, getEnv } from 'mobx-state-tree';
import * as fns from 'date-fns';

import { secureStorage } from '~/constants';
import { SecureStore } from '~/services';
import { localization } from '~/localization';

import { AuthStore } from './auth';
import { ViewerStore } from './viewer';

export const RootStore = types
  .model({
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),

    isInitialized: false,
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }))
  .actions((store) => ({
    initTokens: flow(function* initTokens() {
      SecureStore.onChange(secureStorage.AUTH_TOKEN, (tokens) => {
        store.Api.setAuthToken(tokens?.access?.token || null);
      });

      const tokens = yield SecureStore.get(secureStorage.AUTH_TOKEN);

      if (!tokens) {
        throw Error('Unauthorized user');
      }

      const isRefreshTokenExpired = fns.isBefore(new Date(tokens.refresh.expires), Date.now());

      if (isRefreshTokenExpired) {
        throw Error('Token expired');
      }

      const isAccessTokenExpired = fns.isBefore(new Date(tokens.access.expires), Date.now());

      if (isAccessTokenExpired) {
        const { data } = yield store.Api.refreshTokens({ refreshToken: tokens.refresh.token });
        yield SecureStore.set(secureStorage.AUTH_TOKEN, data);
      }
    }),
    init: flow(function* init() {
      try {
        yield localization.init();
        yield store.initTokens();
        yield store.viewer.getUser.run();

        store.auth.setAuthorizationStatus(true);
      } catch (err) {
        yield SecureStore.remove(secureStorage.AUTH_TOKEN);
        console.log(err);
      } finally {
        store.isInitialized = true;
      }
    }),
  }));
