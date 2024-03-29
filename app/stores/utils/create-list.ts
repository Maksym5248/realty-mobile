import { types, IModelType } from 'mobx-state-tree';

interface IListOptions {
  pageSize: number;
}

export function createList(name: string, Model: IModelType<any, any>, options: IListOptions) {
  const { pageSize } = options;

  return types
    .model(name, {
      _array: types.array(Model),
      pages: undefined,
      pageSize,
    })

    .views((self) => ({
      get asArray() {
        return self._array.slice();
      },

      get first() {
        return self._array[0];
      },

      get last() {
        return self._array[self._array.length - 1];
      },

      get length() {
        return self._array.length;
      },
    }))
    .views((self) => ({
      get currentPage() {
        if (self.length === 0 || self.pages === undefined) {
          return 0;
        }

        return Math.ceil(self.length / self.pageSize);
      },
    }))
    .views((self) => ({
      get isMorePages() {
        return !(self.currentPage >= self.pages && self.pages !== undefined);
      },
    }))
    .views((self) => ({
      get nextPage() {
        return self.isMorePages ? self.currentPage + 1 : 0;
      },
      byIndex(index: number) {
        return self._array[index];
      },

      includes(id: string) {
        return self._array.includes(id);
      },

      findIndex(id: string) {
        return self._array.findIndex((i) => i === id);
      },
    }))

    .actions((self) => ({
      setPages(pages: number) {
        self.pages = pages;
      },

      push(...ids: string[]) {
        self._array.push(...ids);
      },

      replace(index: number, id: string) {
        self._array[index] = id;
      },

      remove(index: number) {
        self._array.splice(index, 1);
      },

      clear() {
        self._array.clear();
      },
    }));
}
