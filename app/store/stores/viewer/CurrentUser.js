import { types as t } from 'mobx-state-tree';

export const CurrentUserModel = t
  .model('CurrentUser', {
    id: t.number,
    name: t.string,
  })
  .actions((self) => ({
    set(user) {
      Object.assign(self, user);
    },
  }));
