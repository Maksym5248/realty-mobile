import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { localization } from './localization';
import { translate } from './translate';

export const LocalizationContext = createContext({});

export const LocalizationProvider = ({ children }) => {
  const [data, setData] = useState({
    languageTag: localization.languageTag,
  });

  useEffect(() => {
    const remove = localization.onChange((newData) => {
      setData(newData);
    });

    return remove;
  }, []);

  return <LocalizationContext.Provider value={data}>{children}</LocalizationContext.Provider>;
};

export const useLocalization = ({ screen } = {}) => {
  const data = useContext(LocalizationContext);

  const t = useCallback(
    (key, options) => {
      const _key = screen ? `${screen}.${key}` : key;

      return translate(_key, options);
    },
    [screen],
  );

  return {
    ...data,
    t,
    localization,
  };
};
