import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { v4 as uuidv4 } from 'uuid';
import { storage } from './storage';

const uk = require('./translations/uk');

i18n.fallbacks = true;
i18n.translations = { uk };

const fallback = { languageTag: 'uk', isRTL: false, countryCode: 'UA' };

class Localization {
  constructor() {
    this.languageTag = null;
    this.currency = null;

    this._listeners = [];
  }

  // observer
  onChange = (callBack) => {
    const key = uuidv4();

    this._listeners.push({
      callBack,
      key,
    });

    return () => (this._listeners = this._listeners.filter((el) => el.key !== key));
  };

  _send = () => {
    this._listeners.forEach(({ callBack }) => {
      callBack({
        languageTag: this.languageTag,
        currency: this.currency,
      });
    });
  };

  get countryCode() {
    return RNLocalize.getCountry() || fallback.countryCode;
  }

  set = ({ languageTag, currency }) => {
    let isSend = false;

    if (languageTag && languageTag !== this.languageTag) {
      this.languageTag = languageTag;
      i18n.locale = languageTag;
      storage.save({ languageTag });
      isSend = true;
    }

    if (currency && currency !== this.currency) {
      this.currency = currency;
      storage.save({ currency });
      isSend = true;
    }

    if (isSend) {
      this._send();
    }
  };

  init = async () => {
    try {
      const data = {};

      const savedData = await storage.get();

      if (savedData?.languageTag) {
        data.languageTag = savedData?.languageTag;
      } else {
        const bestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback;
        data.languageTag = bestAvailableLanguage.languageTag;
      }

      if (savedData?.currency) {
        data.currency = savedData?.currency;
      } else {
        data.currency = 'uah';
      }

      this.set(data);
    } catch (e) {
      this.set({
        currency: 'uah',
        languageTag: fallback.languageTag,
      });
    }
  };
}

export const localization = new Localization();
