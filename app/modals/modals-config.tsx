import React from 'react';

import { MODALS } from '~/constants';
import { ModalsMapI } from '~/services';

import { Loading } from './loading';

export const modals: ModalsMapI = {
  [MODALS.LOADING]: {
    renderComponent: (props: any) => <Loading {...props} />,
    propsForModal: {
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      backdropOpacity: 0,
    },
  },
};
