import { types, flow, getEnv, Instance } from 'mobx-state-tree';
import * as fns from 'date-fns';

import { SECURE_STORAGE, STORAGE } from '~/constants';
import { ILocalizationData } from '~/localization';
import { IApiTokens } from '~/api';

import { AuthStore } from './auth';
import { ViewerStore } from './viewer';

export interface IRootStore extends Instance<typeof RootStore> {}

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),

    isInitialized: false,
  })
  .actions((self) => {
    const { SecureStorage, Storage, Api, Localization } = getEnv(self);

    return {
      initLocalization: flow(function* initLocalization() {
        Localization.onChange((data: ILocalizationData) => Storage.set(data));

        const initialData = yield Storage.get(STORAGE.LOCALIZATION);

        Localization.init(initialData);
      }),
      initTokens: flow(function* initTokens() {
        SecureStorage.onChange(SECURE_STORAGE.AUTH_TOKEN, (tokens: IApiTokens) => {
          Api.setAuthToken(tokens?.access?.token || null);
        });

        const tokens = yield SecureStorage.get(SECURE_STORAGE.AUTH_TOKEN);

        if (!tokens) {
          throw Error('Unauthorized user');
        }

        const isRefreshTokenExpired = fns.isBefore(new Date(tokens.refresh.expires), Date.now());

        if (isRefreshTokenExpired) {
          throw Error('Token expired');
        }

        const isAccessTokenExpired = fns.isBefore(new Date(tokens.access.expires), Date.now());

        if (isAccessTokenExpired) {
          const { data } = yield Api.refreshTokens({
            refreshToken: tokens.refresh.token,
          });
          yield SecureStorage.set(SECURE_STORAGE.AUTH_TOKEN, data);
        }
      }),
    };
  })
  .actions((self) => {
    const { SecureStorage, Storage, Localization } = getEnv(self);

    return {
      removeAllListeners() {
        SecureStorage.removeAllListeners();
        Storage.removeAllListeners();
        Localization.removeAllListeners();
      },
      init: flow(function* init() {
        try {
          yield self.initLocalization();
          yield self.initTokens();
          yield self.viewer.fetchUser.run();
          self.auth.setAuthorizationStatus(true);
        } catch (err) {
          yield SecureStorage.remove(SECURE_STORAGE.AUTH_TOKEN);
        } finally {
          self.isInitialized = true;
        }
      }),
    };
  });
