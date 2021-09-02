import { types as t } from 'mobx-state-tree';

export const CurrentUserModel = t
  .model('CurrentUser', {
    id: t.identifier,
    name: t.string,
    role: t.enumeration(['user', 'admin']),
    email: t.string,
  })
  .actions((self) => ({
    set(user) {
      Object.assign(self, user);
    },
  }));
