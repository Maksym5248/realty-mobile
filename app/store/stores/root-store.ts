import { types, flow, getEnv } from 'mobx-state-tree';
import * as fns from 'date-fns';

import { SECURE_STORAGE, STORAGE } from '~/constants';
import { Localization } from '~/localization';

import { AuthStore } from './auth';
import { ViewerStore } from './viewer';

export const RootStore = types
  .model({
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),

    isInitialized: false,
  })
  .views((store) => ({
    get ApiService() {
      return getEnv(store).ApiService;
    },
    get SecureStorageService() {
      return getEnv(store).SecureStorageService;
    },
    get StorageService() {
      return getEnv(store).StorageService;
    },
  }))
  .actions((store) => {
    const { SecureStorageService, StorageService, ApiService } = store;

    return {
      initLocalization: flow(function* initLocalization() {
        Localization.onChange((config) => StorageService.set(config));

        const initialData = StorageService.get(STORAGE.LOCALIZATION);

        Localization.init(initialData);
      }),
      initTokens: flow(function* initTokens() {
        SecureStorageService.onChange(SECURE_STORAGE.AUTH_TOKEN, (tokens) => {
          ApiService.setAuthToken(tokens?.access?.token || null);
        });

        const tokens = yield SecureStorageService.get(SECURE_STORAGE.AUTH_TOKEN);

        if (!tokens) {
          throw Error('Unauthorized user');
        }

        const isRefreshTokenExpired = fns.isBefore(new Date(tokens.refresh.expires), Date.now());

        if (isRefreshTokenExpired) {
          throw Error('Token expired');
        }

        const isAccessTokenExpired = fns.isBefore(new Date(tokens.access.expires), Date.now());

        if (isAccessTokenExpired) {
          const { data } = yield store.ApiService.refreshTokens({
            refreshToken: tokens.refresh.token,
          });
          yield SecureStorageService.set(SECURE_STORAGE.AUTH_TOKEN, data);
        }
      }),
    };
  })
  .actions((store) => ({
    init: flow(function* init() {
      const { SecureStorageService } = store;

      try {
        yield store.initLocalization();
        yield store.initTokens();
        yield store.viewer.getUser.run();

        store.auth.setAuthorizationStatus(true);
      } catch (err) {
        yield SecureStorageService.remove(SECURE_STORAGE.AUTH_TOKEN);
        console.log(err);
      } finally {
        store.isInitialized = true;
      }
    }),
  }));
