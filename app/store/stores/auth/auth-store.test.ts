import { RootStore } from '../root-store';
import { AuthStore } from './auth-store';

const testUser = {
  id: '1234567',
  email: 'test@email.com',
  name: 'Max',
  role: 'user',
  password: '12345678',
};

const getAuthResponse = ({ email }) => ({
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
  SecureStorageService: {
    set: () => new Promise.resolve(),
  },
  ApiService: {
    signIn: (data) => new Promise.resolve(getAuthResponse(data)),
    signUp: (data) => new Promise.resolve(getAuthResponse(data)),
  },
};

describe('Store: auth-store', () => {
  it('Action, setAuthorizationStatus', () => {
    const store = AuthStore.create({});

    store.setAuthorizationStatus(true);

    expect(store.isAuthorized).toBe(true);
  });

  it('Async action, signIn', async () => {
    const store = RootStore.create({}, env);

    await store.auth.signIn.run(testUser);

    expect(store.auth.isAuthorized).toBe(true);

    expect(store.viewer.user.email).toBe(testUser.email);
    expect(store.viewer.user.id).toBe(testUser.id);
    expect(store.viewer.user.name).toBe(testUser.name);
    expect(store.viewer.user.role).toBe(testUser.role);
  });

  it('Async action, signUp', async () => {
    const store = RootStore.create({}, env);

    await store.auth.signUp.run(testUser);

    expect(store.auth.isAuthorized).toBe(true);

    expect(store.viewer.user.email).toBe(testUser.email);
    expect(store.viewer.user.id).toBe(testUser.id);
    expect(store.viewer.user.name).toBe(testUser.name);
    expect(store.viewer.user.role).toBe(testUser.role);
  });
});
