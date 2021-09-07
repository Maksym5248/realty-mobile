import React, { useState, useEffect } from 'react';

import { Snackbar } from 'react-native-paper';

import { AlertService } from '~/services';

const wrapperStyle = { marginBottom: 30 };

export const AlertProvider = () => {
  const [data, setData] = useState(AlertService.getInitialValue());

  useEffect(() => {
    AlertService.onChange((newData) => {
      setData((prev) => ({ ...prev, ...newData }));
    });
  }, []);

  const onDismissSnackBar = () => {
    setData({ ...AlertService.getInitialValue() });
  };

  return (
    <Snackbar
      visible={data.isVisible}
      onDismiss={onDismissSnackBar}
      wrapperStyle={wrapperStyle}
      action={{
        label: data.buttonLabel,
        onPress: data?.onPress || onDismissSnackBar,
      }}>
      {data?.text}
    </Snackbar>
  );
};
