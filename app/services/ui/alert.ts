import { isString } from 'lodash';

const initialData = {
  isVisible: false,
  text: '',
  buttonLabel: 'Ok',
  onPress: undefined,
};

interface AlertParamsI {
  text: string;
  buttonLabel: string;
  onPress: (...args: any[]) => void;
}

interface AlertInitialValue extends AlertParamsI {
  isVisible: boolean;
}

class AlertClass {
  constructor() {
    this._listener = null;
  }

  getInitialValue = (): AlertInitialValue => ({ ...initialData });

  show = (params: AlertParamsI) => {
    isString(params)
      ? this._send({ text: params, isVisible: true })
      : this._send({ ...params, isVisible: true });
  };

  hide = () => {
    this._send({ ...initialData, isVisible: false });
  };

  onChange = (callBack) => {
    this._listener = callBack;
  };

  _send = (params: AlertParamsI) => {
    this._listener && this._listener(params);
  };
}

export const AlertService = new AlertClass();
