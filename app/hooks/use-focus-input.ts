import { useRef, useCallback, MutableRefObject } from 'react';

import { TextInput, NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';

type IUseFocusInput = [
  MutableRefObject<TextInput>,
  (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void,
];

export function useFocusInput(): IUseFocusInput {
  const ref = useRef<TextInput>(null);

  const onEdited = useCallback(() => {
    if (ref?.current) {
      ref.current?.focus();
    }
  }, [ref]);

  return [ref, onEdited];
}
