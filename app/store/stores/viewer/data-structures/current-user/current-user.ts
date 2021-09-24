import { types, Instance } from 'mobx-state-tree';

import { ROLES } from '~/constants';

export interface ICurrentUser extends Instance<typeof CurrentUser> {}

export const CurrentUser = types.model('CurrentUser', {
  id: types.identifier,
  name: types.string,
  role: types.enumeration([ROLES.USER, ROLES.ADMIN]),
  email: types.string,
});
