import React, { useState, useEffect } from 'react';

import { Snackbar } from 'react-native-paper';

import { Alert } from '~/services';

const wrapperStyle = { marginBottom: 30 };

export const AlertProvider = () => {
  const [data, setData] = useState(Alert.getInitialValue());

  useEffect(() => {
    Alert.onChange((newData) => {
      setData((prev) => ({ ...prev, ...newData }));
    });
  }, []);

  const onDismissSnackBar = () => {
    Alert.hide();
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
