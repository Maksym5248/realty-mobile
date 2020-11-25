import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { device } from '~/utils';

const SHOW_EVENT = device.isAndroid ? 'keyboardDidShow' : 'keyboardWillShow';
const HIDE_EVENT = device.isAndroid ? 'keyboardDidHide' : 'keyboardWillHide';

export const useKeyboard = () => {
  const [state, setState] = useState({
    event: {
      endCoordinates: {
        height: 0,
      },
    },
    isVisible: false,
  });

  const onShow = useCallback((event) => {
    setState((prev) => ({ ...prev, event, isVisible: true }));
  }, []);

  const onHide = useCallback(() => {
    setState((prev) => ({ ...prev, isVisible: false }));
  }, []);

  useEffect(() => {
    const showListener = Keyboard.addListener(SHOW_EVENT, onShow);
    const hideListener = Keyboard.addListener(HIDE_EVENT, onHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
