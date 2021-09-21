import { ISignInParams, ISignUpParams } from '~/api';

import { RootStore } from '../root-store';
import { AuthStore } from './auth-store';

const testUser = {
  id: '1234567',
  email: 'test@email.com',
  name: 'Max',
  role: 'user',
  password: '12345678',
};

const getAuthResponse = ({ email }: { email: string }) => ({
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
      id: '1234567',
      name: 'Max',
      role: 'user',
      email,
    },
  },
});

const env = {
  Storage: {},
  SecureStorage: {
    set: (): Promise<any> => Promise.resolve(),
  },
  Api: {
    signIn: (data: ISignInParams) => Promise.resolve(getAuthResponse(data)),
    signUp: (data: ISignUpParams) => Promise.resolve(getAuthResponse(data)),
  },
};

describe('Store: auth-store', () => {
  it('Action, setAuthorizationStatus', () => {
    const self = AuthStore.create({});

    self.setAuthorizationStatus(true);

    expect(self.isAuthorized).toBe(true);
  });

  it('Async action, signIn', async () => {
    const self = RootStore.create({}, env);

    await self.auth.signIn.run(testUser);

    expect(self.auth.isAuthorized).toBe(true);

    expect(self.viewer.user.email).toBe(testUser.email);
    expect(self.viewer.user.id).toBe(testUser.id);
    expect(self.viewer.user.name).toBe(testUser.name);
    expect(self.viewer.user.role).toBe(testUser.role);
  });

  it('Async action, signUp', async () => {
    const self = RootStore.create({}, env);

    await self.auth.signUp.run(testUser);

    expect(self.auth.isAuthorized).toBe(true);

    expect(self.viewer.user.email).toBe(testUser.email);
    expect(self.viewer.user.id).toBe(testUser.id);
    expect(self.viewer.user.name).toBe(testUser.name);
    expect(self.viewer.user.role).toBe(testUser.role);
  });
});
