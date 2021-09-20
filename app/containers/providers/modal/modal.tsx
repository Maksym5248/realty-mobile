import React from 'react';

import ModalUI from 'react-native-modal';

import { ModalService, IModalTypeInternal, IModalsMap, IModalsMapInternal } from '~/services';
import { styles } from '~/styles';

interface IModalProviderProps {
  modals: IModalsMap;
}

interface IModalProviderState {
  modals: IModalTypeInternal[];
  visibleModals: IModalsMapInternal;
}

export class ModalProvider extends React.PureComponent<IModalProviderProps, IModalProviderState> {
  _removeListener: () => void;

  constructor(props: IModalProviderProps) {
    super(props);
    this.state = {
      modals: ModalService.registerModals(props.modals),
      visibleModals: {},
    };

    this._removeListener = () => undefined;
  }

  componentDidMount() {
    this._removeListener = ModalService.onChange(async (nextState) => {
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
    ModalService.hide(name);
  };

  onModalHide = (name: string) => {
    ModalService.removeVisibleModal(name);
  };

  render() {
    const { modals, visibleModals } = this.state;

    if (modals.length === 0) {
      return null;
    }

    return modals.map((modal: IModalTypeInternal) => {
      const visibleModal = visibleModals[modal.name];
      const propsForModal = { ...modal?.propsForModal, ...visibleModal?.propsForModal };
      const propsForComponent = {
        hide: () => this.hide(modal.name),
        ...modal?.propsForComponent,
        ...visibleModal?.propsForComponent,
      };

      return (
        <ModalUI
          key={modal.name}
          isVisible={visibleModal?.isVisible}
          style={[styles.modal, modal?.propsForModal?.style]}
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
