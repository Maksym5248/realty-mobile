import S from '@react-native-community/async-storage';

class StorageClass {
  constructor() {
    this.listeners = [];
    this.caches = {};
  }

  set = async (key, value) => {
    this.caches[key] = value;
    this._send(key);

    await S.setItem(key, JSON.stringify(value));
  };

  get = async (key) => {
    if (this.caches[key]) {
      return Promise.resolve(this.caches[key]);
    }

    try {
      const valueString = await S.getItem(key);

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
    await S.removeItem(key);
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

export const Storage = new StorageClass();
