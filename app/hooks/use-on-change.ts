import { useRef } from 'react';
import isEqual from 'lodash/isEqual';

export const useOnChange = (func, props) => {
  const prevProps = useRef(props);

  if (!isEqual(props, prevProps)) {
    func();
    prevProps.current = props;
  }
};
