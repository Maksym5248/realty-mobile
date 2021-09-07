import { ElementType } from 'react';

import { v4 as uuid } from 'uuid';

export interface ModalTypeI {
  name: string;
  propsForComponent?: Object;
  propsForModal?: Object;
  styles?: Object;
  renderComponent: (value: any) => ElementType;
  isVisible?: boolean;
}

export interface ModalsMapI {
  [key: string]: ModalTypeI;
}

interface IListener {
  cb: () => void;
  id: string;
}
class ModalServiceClass {
  _modals: Array<ModalTypeI>;

  _visibleModals: ModalsMapI;

  _listeners: IListener[];

  constructor() {
    this._modals = [];
    this._visibleModals = {};
    this._listeners = [];
  }

  registerModals(modals: ModalsMapI) {
    const arr: Array<any> = Object.entries(modals);

    this._modals = arr.map<Object>((current: Object) => {
      const [key, value] = current;

      return {
        name: key,
        propsForComponent: {},
        propsForModal: {},
        ...value,
      };
    }, {});

    return this._modals;
  }

  show(name: string, propsForComponent: Object = {}, propsForModal: Object = {}) {
    Object.assign(this._visibleModals, {
      [name]: {
        name,
        propsForComponent,
        propsForModal,
        isVisible: true,
      },
    });

    this.send();
  }

  hide(name: string) {
    this._visibleModals[name] = {
      ...this._visibleModals[name],
      isVisible: false,
    };

    this.send();
  }

  removeVisibleModal(name: string) {
    delete this._visibleModals[name];
    this.send();
  }

  hideAll() {
    this._visibleModals = {};
    this.send();
  }

  addListener = (cb: Function) => {
    const id = uuid();

    this._listeners.push({
      cb,
      id,
    });

    return () => {
      this._listeners = this._listeners.filter((el) => el.id !== id);
    };
  };

  send = () => {
    if (this._listeners.length) {
      this._listeners.forEach(({ cb }) => {
        !!cb && cb({ ...this._visibleModals });
      });
    }
  };
}

export const ModalService = new ModalServiceClass();
