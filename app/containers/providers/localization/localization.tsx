import React, { useState, useEffect } from 'react';

import { Localization, ILocalizationData } from '~/localization';
import { TranslateContext } from '~/context';

import { ILocalizationProps } from './localization.types';

export const LocalizationProvider = ({ children }: ILocalizationProps) => {
  const [data, setData] = useState<ILocalizationData>(Localization.data);

  useEffect(() => {
    const removeListener = Localization.onChange((newData) => setData(newData));

    return removeListener;
  }, []);

  return <TranslateContext.Provider value={data.locale}>{children}</TranslateContext.Provider>;
};
