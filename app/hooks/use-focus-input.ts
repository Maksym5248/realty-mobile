import { useRef, useCallback } from 'react';

import { TextInput } from 'react-native';

export function useFocusInput() {
  const ref = useRef<TextInput>(null);

  const onEdited = useCallback(() => {
    if (ref?.current) {
      ref.current?.focus();
    }
  }, [ref]);

  return [ref, onEdited];
}
