import { userMock } from '~/api';

import { RootStore } from '../root-store';
import { envMock } from '../../env.mock';

describe('Auth-store: ', () => {
  it('signIn', async () => {
    const root = RootStore.create({}, envMock);

    await root.auth.signIn.run(userMock);
    expect(root.auth.isAuthorized).toBe(true);

    expect(root.viewer.user.email).toBe(userMock.email);
    expect(root.viewer.user.id).toBe(userMock.id);
    expect(root.viewer.user.name).toBe(userMock.name);
    expect(root.viewer.user.role).toBe(userMock.role);
  });

  it('signUp', async () => {
    const root = RootStore.create({}, envMock);

    await root.auth.signUp.run(userMock);

    expect(root.auth.isAuthorized).toBe(true);

    expect(root.viewer.user.email).toBe(userMock.email);
    expect(root.viewer.user.id).toBe(userMock.id);
    expect(root.viewer.user.name).toBe(userMock.name);
    expect(root.viewer.user.role).toBe(userMock.role);
  });
});
