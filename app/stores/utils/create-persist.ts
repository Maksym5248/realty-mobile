// /* eslint-disable implicit-arrow-linebreak */

import AsyncStorage from '@react-native-community/async-storage';
import { onSnapshot, applySnapshot, Instance } from 'mobx-state-tree';

import { STORAGE } from '~/constants';

import { RootStore } from '../stores';

const defaultProcessor = (v: object): object => v;

function purge() {
  return AsyncStorage.removeItem(STORAGE.PERSIST_STORE);
}

function createRehydrate(store: Instance<typeof RootStore>, deserialize = defaultProcessor) {
  return async function rehydrate() {
    try {
      const json = await AsyncStorage.getItem(STORAGE.PERSIST_STORE);

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

function recordSnapshots(store: Instance<typeof RootStore>, serialize = defaultProcessor) {
  onSnapshot(store, (snapshot) => {
    const json = JSON.stringify(serialize(snapshot));

    AsyncStorage.setItem(STORAGE.PERSIST_STORE, json);
  });
}

export function createPersist(
  store: Instance<typeof RootStore>,
  options: {
    serialize?: (v: object) => object;
    deserialize?: (v: object) => object;
  } = {},
) {
  const { serialize, deserialize } = options;

  recordSnapshots(store, serialize);

  const rehydrate = createRehydrate(store, deserialize);

  return {
    rehydrate,
    purge,
  };
}
