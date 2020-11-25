import { CommonActions, StackActions } from '@react-navigation/native';

class Navigation {
  constructor() {
    this.nav = null;
  }

  init = (navigatorRef) => {
    this.nav = navigatorRef;
  };

  navigate = (routeName, params = {}) => {
    this.nav.dispatch(CommonActions.navigate(routeName, params));
  };

  popToTop = () => {
    this.nav.dispatch(StackActions.popToTop());
  };

  goBack = () => {
    this.nav.dispatch(CommonActions.goBack());
  };

  reset = (state) => {
    this.nav.dispatch(CommonActions.reset(state));
  };
}

export const NavigationService = new Navigation();
