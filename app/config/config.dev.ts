import { NativeModules } from 'react-native';

const host = (NativeModules.SourceCode.scriptURL || 'localhost://9998')
  .split('://')[1]
  .split(':')[0];

const HOST = `http://${host}:3566`;

export const configDev = {
  APP_NAME: 'REALTY_DEV',
  API_URL: `${HOST}/v1`,
  HOST,
};
