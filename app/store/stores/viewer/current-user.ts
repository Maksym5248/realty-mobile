import { types as t, SnapshotOut, applySnapshot } from 'mobx-state-tree';

export interface ICurrentUser extends SnapshotOut<typeof CurrentUserModel> {}

export const CurrentUserModel = t
  .model('CurrentUser', {
    id: t.identifier,
    name: t.string,
    role: t.enumeration(['user', 'admin']),
    email: t.string,
  })
  .actions((self) => ({
    set(user: ICurrentUser) {
      applySnapshot(self, user);
    },
  }));
