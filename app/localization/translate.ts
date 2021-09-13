import { TranslateOptions } from 'i18n-js';

import { Localization } from './localization';

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: string, options?: TranslateOptions) {
  return key ? Localization.t(key, options) : null;
}

export const t = translate;
