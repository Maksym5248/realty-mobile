import { ApiMock } from '~/api';

export const envMock = {
  Storage: {},
  SecureStorage: {
    set: (): Promise<any> => Promise.resolve(),
  },
  Api: ApiMock,
};
