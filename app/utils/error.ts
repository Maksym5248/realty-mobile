import { translate } from '~/localization';

const get = (e) =>
  e?.response?.data?.message || translate(e?.message) || translate('errors.unexpected_error');

export const error = {
  get,
};
