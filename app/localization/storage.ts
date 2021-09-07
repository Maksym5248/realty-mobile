import AsyncStorage from '@react-native-community/async-storage';

import { STORAGE } from '~/constants';

const save = async (newData = {}) => {
  try {
    const json = await AsyncStorage.getItem(STORAGE.LOCALIZATION_STORE);

    const data = json ? JSON.parse(json) : {};

    await AsyncStorage.setItem(
      STORAGE.LOCALIZATION_STORE,
      JSON.stringify({
        ...data,
        ...newData,
      }),
    );
  } catch (e) {
    console.log('e', e);
  }
};

const get = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE.LOCALIZATION_STORE);

    if (!json) {
      throw Error();
    }
    return JSON.parse(json);
  } catch (e) {
    console.log('e', e);
    return null;
  }
};

export const storage = {
  save,
  get,
};
