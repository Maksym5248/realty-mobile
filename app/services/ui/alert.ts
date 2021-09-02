import React, { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import { isString } from 'lodash';

const initialData = {
  isVisible: false,
  text: '',
  buttonLabel: 'Ok',
  onPress: undefined,
};

class AlertService {
  constructor() {
    this._listener = null;
  }

  show = (params = {}) => {
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

  _send = (params) => {
    this._listener && this._listener(params);
  };
}

export const Alert = new AlertService();

const wrapperStyle = { marginBottom: 30 };

export const AlertProvider = () => {
  const [data, setData] = useState({ ...initialData });

  useEffect(() => {
    Alert.onChange((newData) => {
      setData((prev) => ({ ...prev, ...newData }));
    });
  }, []);

  const onDismissSnackBar = () => {
    setData({ ...initialData });
  };

  return (
    <Snackbar
      visible={data.isVisible}
      onDismiss={onDismissSnackBar}
      wrapperStyle={wrapperStyle}
      action={{
        label: data.buttonLabel,
        onPress: data?.onPress || onDismissSnackBar,
      }}
    >
      {data?.text}
    </Snackbar>
  );
};
