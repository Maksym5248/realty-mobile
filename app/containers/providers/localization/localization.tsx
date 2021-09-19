import React, { useState, useEffect } from 'react';

import { LocalizationService, ILocalizationData } from '~/services';
import { LocalizationContext } from '~/context';

export const LocalizationProvider = ({ children }) => {
  const [data, setData] = useState<ILocalizationData>(LocalizationService.data);

  useEffect(() => {
    const remove = LocalizationService.onChange((newData) => setData(newData));

    return remove;
  }, []);

  return <LocalizationContext.Provider value={data}>{children}</LocalizationContext.Provider>;
};
