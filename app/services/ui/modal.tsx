import { ReactNode } from 'react';

import EventEmitter from 'events';

import { ModalProps } from 'react-native-modal';

// @ts-ignore
const eventEmitter = new EventEmitter();

export interface IModalType {
  propsForComponent?: object;
  propsForModal?: Partial<ModalProps>;
  renderComponent: (props: any) => ReactNode;
}
export interface IModalTypeInternal extends IModalType {
  name: string;
  isVisible: boolean;
}

export interface IModalsMap {
  [key: string]: IModalType;
}

export interface IModalsMapInternal {
  [key: string]: IModalTypeInternal;
}

enum Events {
  Change = 'change',
}
class ModalClass {
  private _modals: Array<IModalTypeInternal>;

  visibleModals: IModalsMapInternal;

  constructor() {
    this._modals = [];
    this.visibleModals = {};
  }

  registerModals(modals: IModalsMap) {
    const arr: [string, IModalType][] = Object.entries(modals);

    this._modals = arr.map((current: [string, IModalType]) => {
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
    Object.assign(this.visibleModals, {
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
    this.visibleModals[name] = {
      ...this.visibleModals[name],
      isVisible: false,
    };

    eventEmitter.emit(Events.Change);
  }

  removeVisibleModal(name: string) {
    delete this.visibleModals[name];
    eventEmitter.emit(Events.Change, this.visibleModals);
  }

  hideAll() {
    this.visibleModals = {};
    eventEmitter.emit(Events.Change);
  }

  onChange = (callBack: (visibleModals: IModalsMapInternal) => void) => {
    eventEmitter.on(Events.Change, callBack);

    return () => eventEmitter.removeListener(Events.Change, callBack);
  };
}

export const Modal = new ModalClass();
