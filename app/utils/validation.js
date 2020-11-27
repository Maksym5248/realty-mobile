import * as Yup from 'yup';

const t = (v) => `errors.${v}`;

const password = Yup.string().required(t('required')).min(8, t('min'));
const name = Yup.string().required(t('required')).min(2, t('min'));

const email = Yup.string().email(t('incorrect')).required(t('required')).trim(t('required'));

const shape = (rules) => Yup.object().shape(rules);

export const validation = {
  shape,
  password,
  email,
  name,
};
