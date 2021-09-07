import SInfo from 'react-native-sensitive-info';

import { config } from '~/config';

/*
@examples
  SecureStore.set(tokens.AUTH, token);
  SecureStore.get(tokens.AUTH);
  SecureStore.remove(tokens.AUTH);
  SecureStore.onChange(tokens.AUTH, (value) => {
    this._token = value;
    common.Authorization = `Bearer ${value}`;
  });
*/

class SecureStorageClass {
  constructor() {
    this.listeners = [];
    this.config = {
      sharedPreferencesName: config.APP_NAME,
      keychainService: config.APP_NAME,
    };

    this.caches = {};
  }

  set = async (key, value) => {
    this.caches[key] = value;
    this._send(key);

    await SInfo.setItem(key, JSON.stringify(value), this.config);
  };

  get = async (key) => {
    if (this.caches[key]) {
      return Promise.resolve(this.caches[key]);
    }

    try {
      const valueString = await SInfo.getItem(key, this.config);

      const value = JSON.parse(valueString);

      this.caches[key] = value;
      this._send(key);

      return value;
    } catch (e) {
      return null;
    }
  };

  remove = async (key) => {
    this.caches[key] = null;
    this._send(key);

    await SInfo.deleteItem(key, this.config);
  };

  onChange = (key, callBack, initWithRun = false) => {
    this.listeners.push({
      callBack,
      key,
    });

    if (initWithRun && this.caches[key]) {
      callBack(this.caches[key]);
    }
  };

  _send = (receiverKey) => {
    this.listeners.forEach(({ callBack, key }) => {
      if (receiverKey === key) {
        callBack(this.caches[key]);
      }
    });
  };
}

export const SecureStorageService = new SecureStorageClass();
