import { userMock } from '~/api';

import { RootStore } from '../root-store';
import { envMock } from '../../env.mock';

describe('Auth-store: ', () => {
  it('signIn', async () => {
    const self = RootStore.create({}, envMock);

    await self.auth.signIn.run(userMock);
    expect(self.auth.isAuthorized).toBe(true);

    expect(self.viewer.user.email).toBe(userMock.email);
    expect(self.viewer.user.id).toBe(userMock.id);
    expect(self.viewer.user.name).toBe(userMock.name);
    expect(self.viewer.user.role).toBe(userMock.role);
  });

  it('signUp', async () => {
    const self = RootStore.create({}, envMock);

    await self.auth.signUp.run(userMock);

    expect(self.auth.isAuthorized).toBe(true);

    expect(self.viewer.user.email).toBe(userMock.email);
    expect(self.viewer.user.id).toBe(userMock.id);
    expect(self.viewer.user.name).toBe(userMock.name);
    expect(self.viewer.user.role).toBe(userMock.role);
  });
});
