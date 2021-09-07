import React from 'react';

import { MODALS } from '~/constants';

import { Loading } from './loading';

export const modals = {
  [MODALS.LOADING]: {
    renderComponent: (props: any) => <Loading {...props} />,
    propsForModal: {
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      backdropOpacity: 0,
    },
  },
};
