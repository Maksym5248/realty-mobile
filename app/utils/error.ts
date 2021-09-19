import { t } from './localization';

const get = (e) => e?.response?.data?.message || t(e?.message) || t('errors.unexpected_error');

export const error = {
  get,
};
