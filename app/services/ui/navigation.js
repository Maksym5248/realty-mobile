import { CommonActions, StackActions } from '@react-navigation/native';

class NavigationService {
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
  addListener = (name, func) => {
    return this.nav.addListener(name, func);
  };
}

export const Navigation = new NavigationService();
