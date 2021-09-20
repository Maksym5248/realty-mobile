import EventEmitter from 'events';

import { isString } from 'lodash';

interface IAlertShowParams {
  text: string;
  buttonLabel: string;
  onPress: (...args: any[]) => void;
}

interface IAlertHideValue extends IAlertShowParams {
  isVisible: boolean;
}

enum EVENTS {
  ON_CHANGE_VISIBLE = 'ON_CHANGE_VISIBLE',
}

// @ts-ignore
const eventEmitter = new EventEmitter();

const initialData: IAlertHideValue = {
  isVisible: false,
  text: '',
  buttonLabel: 'Ok',
  onPress: undefined,
};

class AlertClass {
  getInitialValue = (): IAlertHideValue => ({ ...initialData });

  show = (params: IAlertShowParams | string) => {
    const data = { ...initialData, isVisible: true };

    isString(params) ? (data.text = params) : Object.assign(data, params);

    eventEmitter.emit(EVENTS.ON_CHANGE_VISIBLE, data);
  };

  hide = () => {
    eventEmitter.emit(EVENTS.ON_CHANGE_VISIBLE, { ...initialData, isVisible: false });
  };

  onChange = (callBack: (value: IAlertHideValue) => void) => {
    eventEmitter.on(EVENTS.ON_CHANGE_VISIBLE, callBack);

    return () => eventEmitter.removeListener(EVENTS.ON_CHANGE_VISIBLE, callBack);
  };
}

export const AlertService = new AlertClass();
