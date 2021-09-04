import React from 'react';
import { modals as modalsNames } from '~/constants';

import { Loading } from './loading';

export const modals = {
  [modalsNames.Loading]: {
    renderComponent: (props: any) => <Loading {...props} />,
    propsForModal: {
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      backdropOpacity: 0,
    },
  },
};
