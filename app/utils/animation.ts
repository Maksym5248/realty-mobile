import { LayoutAnimationConfig } from 'react-native';

import { device } from './device';

const keyboard = {
  duration: 200,
  update: {
    type: device.isIOS ? 'keyboard' : 'linear',
  },
} as LayoutAnimationConfig;

export const layoutConfig = { keyboard };
