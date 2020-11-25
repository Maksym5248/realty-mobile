import { types, flow, getEnv } from 'mobx-state-tree';

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
    init: flow(function* init() {
      try {
        yield localization.init();

        SecureStore.onChange(secureStorage.AUTH_TOKEN, (token) => {
          store.Api.setAuthToken(token);
        });

        const token = yield SecureStore.get(secureStorage.AUTH_TOKEN);

        if (!token) {
          throw Error('Unauthorized user');
        }

        // yield store.viewer.getUser.run();

        store.auth.setAuthorizationStatus(true);
      } catch (err) {
        console.log(err);
      } finally {
        store.isInitialized = true;
      }
    }),
  }));
