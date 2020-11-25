// /* eslint-disable implicit-arrow-linebreak */

import AsyncStorage from '@react-native-community/async-storage';

import { onSnapshot, applySnapshot } from 'mobx-state-tree';
import { storage } from '~/constants';

const defaultProcessor = (v) => v;

function purge() {
  return AsyncStorage.removeItem(storage.PERSIST_STORE);
}

function createRehydrate(store, deserialize = defaultProcessor) {
  return async function rehydrate() {
    try {
      const json = await AsyncStorage.getItem(storage.PERSIST_STORE);

      if (!json) {
        return;
      }

      const snapshot = JSON.parse(json);
      applySnapshot(store, deserialize(snapshot));
    } catch (err) {
      purge();
      console.log(err);
    }
  };
}

function recordSnapshots(store, serialize = defaultProcessor) {
  onSnapshot(store, (snapshot) => {
    const json = JSON.stringify(serialize(snapshot));

    AsyncStorage.setItem(storage.PERSIST_STORE, json);
  });
}

export function createPersist(store, options = {}) {
  const { serialize, deserialize } = options;

  recordSnapshots(store, serialize);

  const rehydrate = createRehydrate(store, deserialize);

  return {
    rehydrate,
    purge,
  };
}
