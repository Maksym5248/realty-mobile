import EventEmitter from 'events';

import * as RNLocalize from 'react-native-localize';
import i18n, { TranslateOptions } from 'i18n-js';
import { cloneDeep } from 'lodash';

import { translate } from '~/utils';

enum EVENTS {
  ON_CHANGE = 'ON_CHANGE',
}

export interface ILocalizationData {
  locale: string;
}

interface ITranslations {
  [locale: string]: object;
}

const fallback = {
  isRTL: false,
  languageTag: 'uk',
  countryCode: 'UA',
};

// @ts-ignore
const eventEmitter = new EventEmitter();

const findBestAvailableLanguage = (languageTags: string[]): { languageTag: string } => {
  return RNLocalize.findBestAvailableLanguage(languageTags) || fallback;
};

class LocalizationClass {
  constructor() {
    i18n.fallbacks = true;
    i18n.defaultLocale = 'uk';
  }

  private setTranslations = (translations: ITranslations) => {
    i18n.translations = translations;
  };

  private setLocale = (languageTag: string) => {
    i18n.locale = languageTag;
  };

  private sendEvent() {
    eventEmitter.emit(EVENTS.ON_CHANGE, cloneDeep(this.data));
  }

  public get data(): Readonly<ILocalizationData> {
    return {
      locale: i18n.currentLocale(),
    };
  }

  public updateLocale = (locale: string) => {
    this.setLocale(locale);
    this.sendEvent();
  };

  /**
   * translate
   */
  public t(key: string, options?: TranslateOptions): string {
    return translate(key, options);
  }

  public onChange = (callBack: (value: ILocalizationData) => void) => {
    eventEmitter.on(EVENTS.ON_CHANGE, callBack);

    return () => eventEmitter.removeListener(EVENTS.ON_CHANGE, callBack);
  };

  public removeAllListeners() {
    eventEmitter.removeAllListeners();
  }

  public init = async (translations: ITranslations, initialData?: ILocalizationData) => {
    this.setTranslations(translations);

    try {
      if (initialData?.locale) {
        this.setLocale(initialData?.locale);
      } else {
        const bestAvailableLanguage = findBestAvailableLanguage(Object.keys(translations));
        this.setLocale(bestAvailableLanguage.languageTag);
      }
    } catch (e) {
    } finally {
      this.sendEvent();
    }
  };
}

export const LocalizationService = new LocalizationClass();
