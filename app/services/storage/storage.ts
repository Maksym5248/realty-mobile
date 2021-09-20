import EventEmitter from 'events';

import S from '@react-native-community/async-storage';

import { Cache } from '~/utils';

// @ts-ignore
const eventEmitter = new EventEmitter();

class StorageClass {
  cache: Cache;

  constructor() {
    this.cache = new Cache();
  }

  set = async (key: string, value: any) => {
    await S.setItem(key, JSON.stringify(value));
    this.cache.set(key, value);
    eventEmitter.emit(key, this.cache.get(key));
  };

  get = async (key: string) => {
    if (this.cache.get(key)) {
      return Promise.resolve(this.cache.get(key));
    }

    try {
      const valueJson = await S.getItem(key);

      const value = JSON.parse(valueJson);

      this.cache.set(key, value);

      return value;
    } catch (e) {
      return null;
    }
  };

  remove = async (key: string) => {
    await S.removeItem(key);
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

export const StorageService = new StorageClass();
