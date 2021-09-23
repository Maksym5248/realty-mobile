import { types, SnapshotIn } from 'mobx-state-tree';

import { ROLES } from '~/constants';

export interface ICurrentUser extends SnapshotIn<typeof CurrentUserModel> {}

export const CurrentUserModel = types.model('CurrentUser', {
  id: types.identifier,
  name: types.string,
  role: types.enumeration([ROLES.USER, ROLES.ADMIN]),
  email: types.string,
});
