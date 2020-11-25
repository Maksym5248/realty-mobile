// @flow
import React from 'react';
import { modals as modalsNames } from '~/constants';

import { Loading } from './Loading';

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
