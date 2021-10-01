import { SecureStorage, Storage } from '~/services';
import { Api } from '~/api';
import { Localization } from '~/localization';

export interface IEnv {
  Storage: typeof Storage;
  SecureStorage: typeof SecureStorage;
  Api: typeof Api;
  Localization: typeof Localization;
}

export const env = {
  Api,
  Localization,
  Storage,
  SecureStorage,
};
