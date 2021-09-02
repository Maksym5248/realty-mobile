import { useRef, useCallback } from 'react';

export function useFocusInput() {
  const ref = useRef(null);

  const onEdited = useCallback(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, [ref]);

  return [ref, onEdited];
}
