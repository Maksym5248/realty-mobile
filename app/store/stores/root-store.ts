import { types, flow, getEnv } from 'mobx-state-tree';
import * as fns from 'date-fns';

import { SECURE_STORAGE, STORAGE } from '~/constants';
import { translations } from '~/localization';
import { ILocalizationData } from '~/services';

import { AuthStore } from './auth';
import { ViewerStore } from './viewer';

interface ITokens {
  access: {
    expires: string;
    token: string;
  };
  refresh: {
    expires: string;
    token: string;
  };
}

export const RootStore = types
  .model({
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),

    isInitialized: false,
  })
  .actions((store) => {
    const { SecureStorageService, StorageService, ApiService, LocalizationService } = getEnv(store);

    return {
      initLocalization: flow(function* initLocalization() {
        LocalizationService.onChange((data: ILocalizationData) => StorageService.set(data));

        const initialData = yield StorageService.get(STORAGE.LOCALIZATION);

        LocalizationService.init(translations, initialData);
      }),
      initTokens: flow(function* initTokens() {
        SecureStorageService.onChange(SECURE_STORAGE.AUTH_TOKEN, (tokens: ITokens) => {
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
          const { data } = yield ApiService.refreshTokens({
            refreshToken: tokens.refresh.token,
          });
          yield SecureStorageService.set(SECURE_STORAGE.AUTH_TOKEN, data);
        }
      }),
    };
  })
  .actions((store) => {
    const { SecureStorageService, StorageService, LocalizationService } = getEnv(store);

    return {
      removeAllListeners() {
        SecureStorageService.removeAllListeners();
        StorageService.removeAllListeners();
        LocalizationService.removeAllListeners();
      },
      init: flow(function* init() {
        try {
          yield store.initLocalization();
          yield store.initTokens();
          yield store.viewer.getUser.run();
          store.auth.setAuthorizationStatus(true);
        } catch (err) {
          yield SecureStorageService.remove(SECURE_STORAGE.AUTH_TOKEN);
        } finally {
          store.isInitialized = true;
        }
      }),
    };
  });
