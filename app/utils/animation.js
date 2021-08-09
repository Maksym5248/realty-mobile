import { device } from './device';

const keyboard = {
  duration: 200,
  update: {
    type: device.isIOS ? 'keyboard' : 'linear',
  },
};

export const layoutConfig = { keyboard };
