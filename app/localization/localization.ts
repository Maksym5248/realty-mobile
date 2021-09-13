import EventEmitter from 'events';

import * as RNLocalize from 'react-native-localize';
import i18n, { TranslateOptions } from 'i18n-js';
import { cloneDeep } from 'lodash';

import { ILocalizationData, LocalizationEvents } from './types';

const fallback = {
  isRTL: false,
  languageTag: 'uk',
  countryCode: 'UA',
};

// @ts-ignore
const eventEmitter = new EventEmitter();

const findBestAvailableLanguage = (): { languageTag: string } => {
  return RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback;
};

class LocalizationClass {
  private data: ILocalizationData;

  constructor() {
    const uk = require('./translations/uk');

    i18n.fallbacks = true;
    i18n.translations = { uk };

    this.data = {
      languageTag: undefined,
    };
  }

  get languageTag() {
    return this.data.languageTag;
  }

  get countryCode() {
    return RNLocalize.getCountry() || fallback.countryCode;
  }

  getData(): ILocalizationData {
    return cloneDeep(this.data);
  }

  onChange = (callBack: (value: ILocalizationData) => void) => {
    eventEmitter.on(LocalizationEvents.ChangeData, callBack);

    return () => eventEmitter.removeListener(LocalizationEvents.ChangeData, callBack);
  };

  setLanguageTag = (languageTag: string) => {
    this.data.languageTag = languageTag;
    i18n.locale = languageTag;

    eventEmitter.emit(LocalizationEvents.ChangeData, cloneDeep(this.data));
  };

  // translate
  t(key: string, options?: TranslateOptions): string {
    return key
      ? i18n.t(key, {
          defaultValue: key,
          ...(options || {}),
        })
      : null;
  }

  init = async (initialData?: ILocalizationData) => {
    const data: ILocalizationData = {
      languageTag: fallback.languageTag,
    };

    try {
      if (initialData?.languageTag) {
        data.languageTag = initialData?.languageTag;
      } else {
        const bestAvailableLanguage = findBestAvailableLanguage();
        data.languageTag = bestAvailableLanguage.languageTag;
      }
    } catch (e) {
    } finally {
      Object.assign(data);
    }
  };
}

export const Localization = new LocalizationClass();
