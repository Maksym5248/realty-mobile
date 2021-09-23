import React from 'react';

import { MODALS } from '~/constants';
import { IModalsMap } from '~/services';

import { Loading } from './loading';

export const modals: IModalsMap = {
  [MODALS.LOADING]: {
    renderComponent: (props: any) => <Loading {...props} />,
    propsForModal: {
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      backdropOpacity: 0,
    },
  },
};
