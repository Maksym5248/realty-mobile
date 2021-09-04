import React, { ElementType } from 'react';

import ModalUI from 'react-native-modal';
import { v4 as uuid } from 'uuid';

import { styles } from '~/styles';

interface ModalType {
  name: string;
  propsForComponent?: Object;
  propsForModal?: Object;
  styles?: Object;
  renderComponent: (value: any) => ElementType;
  isVisible?: boolean;
}

interface ModalsMap {
  [key: string]: ModalType;
}

interface IListener {
  cb: () => void;
  id: string;
}
class ModalServiceClass {
  _modals: Array<ModalType>;

  _visibleModals: ModalsMap;

  _listeners: IListener[];

  constructor() {
    this._modals = [];
    this._visibleModals = {};
    this._listeners = [];
  }

  registerModals(modals: ModalsMap) {
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

export const Modal = new ModalServiceClass();

type ModalProviderProps = {
  modals: ModalsMap;
};

type ModalProviderState = {
  modals: Array<ModalType>;
  visibleModals: ModalsMap;
};

export class ModalProvider extends React.PureComponent<ModalProviderProps, ModalProviderState> {
  _removeListener: () => void;

  constructor(props: ModalProviderProps) {
    super(props);
    this.state = {
      modals: Modal.registerModals(props.modals),
      visibleModals: {},
    };

    this._removeListener = () => undefined;
  }

  componentDidMount() {
    this._removeListener = Modal.addListener(async (nextState) => {
      this.setState({
        ...this.state,
        visibleModals: nextState,
      });
    });
  }

  componentWillUnmount() {
    this._removeListener();
  }

  hide = (name: string) => {
    Modal.hide(name);
  };

  onModalHide = (name: string) => {
    Modal.removeVisibleModal(name);
  };

  render() {
    const { modals, visibleModals } = this.state;

    if (modals.length === 0) {
      return null;
    }

    return modals.map<Object>((modal: ModalType) => {
      const visibleModal = visibleModals[modal.name];
      const propsForModal = { ...modal?.propsForModal, ...visibleModal?.propsForModal };
      const propsForComponent = {
        hide: () => this.hide(modal.name),
        ...modal?.propsForComponent,
        ...visibleModal?.propsForComponent,
      };

      return (
        <ModalUI
          key={modal?.name}
          isVisible={visibleModal?.isVisible}
          style={[styles.modal, modal?.styles]}
          useNativeDriver
          backdropOpacity={0.5}
          coverScreen={false}
          onModalHide={() => this.onModalHide(modal.name)}
          {...propsForModal}>
          {modal.renderComponent(propsForComponent)}
        </ModalUI>
      );
    });
  }
}
