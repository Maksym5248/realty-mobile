import { pick } from 'lodash';

import { ROLES } from '~/constants';

import { ISignInParams, ISignUpParams } from './api.types';

export const userMock = {
  id: '1234567',
  email: 'test@email.com',
  name: 'Max',
  role: ROLES.USER,
  password: '12345678Id',
};

const getResponse = (data: { email: string; name?: string }) => ({
  data: {
    tokens: {
      refresh: {
        expires: new Date().toString(),
        token: 'token',
      },
      access: {
        expires: new Date().toString(),
        token: 'token',
      },
    },
    user: {
      ...pick(userMock, ['id', 'email', 'role', 'name']),
      ...pick(data, ['email', 'name']),
    },
  },
});

export const ApiMock = {
  signIn: (data: ISignInParams) => Promise.resolve(getResponse(data)),
  signUp: (data: ISignUpParams) => Promise.resolve(getResponse(data)),
};
