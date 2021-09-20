import EventEmitter from 'events';

import SInfo from 'react-native-sensitive-info';

import { config } from '~/config';
import { Cache } from '~/utils';

// @ts-ignore
const eventEmitter = new EventEmitter();

interface IConfig {
  sharedPreferencesName: string;
  keychainService: string;
}

class SecureStorageClass {
  config: IConfig;
  cache: Cache;

  constructor() {
    this.config = {
      sharedPreferencesName: config.APP_NAME,
      keychainService: config.APP_NAME,
    };

    this.cache = new Cache();
  }

  set = async (key: string, value: any) => {
    await SInfo.setItem(key, JSON.stringify(value), this.config);
    this.cache.set(key, value);

    eventEmitter.emit(key, this.cache.get(key));
  };

  get = async (key: string) => {
    if (this.cache.get(key)) {
      return Promise.resolve(this.cache.get(key));
    }

    try {
      const valueJson = await SInfo.getItem(key, this.config);

      const value = JSON.parse(valueJson);

      this.cache.set(key, value);

      return value;
    } catch (e) {
      return null;
    }
  };

  remove = async (key: string) => {
    await SInfo.deleteItem(key, this.config);
    this.cache.remove(key);

    eventEmitter.emit(key, this.cache.get(key));
  };

  onChange = (key: string, callBack: (value: any) => void) => {
    eventEmitter.on(key, callBack);

    return () => eventEmitter.removeListener(key, callBack);
  };

  removeAllListeners() {
    eventEmitter.removeAllListeners();
  }
}

export const SecureStorageService = new SecureStorageClass();
