import { ReactNode } from 'react';

import EventEmitter from 'events';

// @ts-ignore
const eventEmitter = new EventEmitter();

export interface ModalTypeI {
  propsForComponent?: Object;
  propsForModal?: Object;
  renderComponent: (props: any) => ReactNode;
}
export interface ModalTypeInternalI extends ModalTypeI {
  name: string;
  isVisible: boolean;
}

export interface ModalsMapI {
  [key: string]: ModalTypeI;
}

export interface ModalsMapInternalI {
  [key: string]: ModalTypeInternalI;
}

enum Events {
  Change = 'change',
}
class ModalServiceClass {
  _modals: Array<ModalTypeInternalI>;

  _visibleModals: ModalsMapInternalI;

  constructor() {
    this._modals = [];
    this._visibleModals = {};
  }

  registerModals(modals: ModalsMapI) {
    const arr: [string, ModalTypeI][] = Object.entries(modals);

    this._modals = arr.map((current: [string, ModalTypeI]) => {
      const [key, value] = current;

      return {
        name: key,
        isVisible: false,
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

    eventEmitter.emit(Events.Change);
  }

  hide(name: string) {
    this._visibleModals[name] = {
      ...this._visibleModals[name],
      isVisible: false,
    };

    eventEmitter.emit(Events.Change);
  }

  removeVisibleModal(name: string) {
    delete this._visibleModals[name];
    eventEmitter.emit(Events.Change);
  }

  hideAll() {
    this._visibleModals = {};
    eventEmitter.emit(Events.Change);
  }

  onChange = (callBack: Function) => {
    eventEmitter.on(Events.Change, callBack);

    return () => eventEmitter.removeListener(Events.Change, callBack);
  };
}

export const ModalService = new ModalServiceClass();
