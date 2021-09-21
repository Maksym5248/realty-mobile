import React, { useState, useEffect } from 'react';

import { Localization, ILocalizationData } from '~/localization';
import { LocalizationContext } from '~/context';

export const LocalizationProvider = ({ children }) => {
  const [data, setData] = useState<ILocalizationData>(Localization.data);

  useEffect(() => {
    const remove = Localization.onChange((newData) => setData(newData));

    return remove;
  }, []);

  return <LocalizationContext.Provider value={data}>{children}</LocalizationContext.Provider>;
};
