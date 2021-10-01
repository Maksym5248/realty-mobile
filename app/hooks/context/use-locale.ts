import { useContext, useCallback } from 'react';

import { TranslateOptions } from 'i18n-js';

import { Localization, ILocalizationData } from '~/localization';
import { TranslateContext } from '~/context';

interface UseLocalizationOptions {
  prefix?: string;
}

export const useLocale = ({ prefix }: UseLocalizationOptions = {}) => {
  const locale = useContext(TranslateContext) as ILocalizationData;

  const t = useCallback(
    (key: string, options?: TranslateOptions) => {
      const _key = prefix ? `${prefix}.${key}` : key;

      return Localization.t(_key, options);
    },
    [prefix],
  );

  return {
    t,
    locale,
  };
};
