import {
  CommonActions,
  StackActions,
  NavigationState,
  EventListenerCallback,
  NavigationContainerEventMap,
} from '@react-navigation/native';
import { NavigationContainerRef } from '@react-navigation/core';

class NavigationClass {
  private nav: NavigationContainerRef;

  constructor() {
    this.nav = null;
  }

  init = (navigatorRef: NavigationContainerRef) => {
    this.nav = navigatorRef;
  };

  navigate = (routeName: string, params = {}) => {
    this.nav.dispatch(CommonActions.navigate(routeName, params));
  };

  popToTop = () => {
    this.nav.dispatch(StackActions.popToTop());
  };

  goBack = () => {
    this.nav.dispatch(CommonActions.goBack());
  };

  reset = (state: NavigationState) => {
    this.nav.dispatch(CommonActions.reset(state));
  };

  onChange = (
    name: keyof NavigationContainerEventMap,
    callBack: EventListenerCallback<NavigationContainerEventMap, any>,
  ) => {
    this.nav.addListener(name, callBack);

    return () => this.nav.removeListener(name, callBack);
  };
}

export const Navigation = new NavigationClass();
