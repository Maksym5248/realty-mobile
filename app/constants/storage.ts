import { config } from '~/config';

const addAppName = (appName, constants) => Object.entries(constants).reduce((acc, current) => {
  const [key, value] = current;

  acc[key] = `${appName}-${value}`;

  return acc;
}, {});

export const storage = Object.freeze(
  addAppName(config.APP_NAME, {
    NOTIFICATION_DEVICE_ID: 'NOTIFICATION_DEVICE_ID',
    LOCALIZATION_STORE: 'LOCALIZATION_STORE',
    PERSIST_STORE: 'PERSIST_STORE',
    SMS_PROTECTION: 'SMS_PROTECTION',
  }),
);
