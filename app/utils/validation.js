import * as Yup from 'yup';

const t = (v) => `errors.${v}`;

Yup.addMethod(Yup.boolean, 'checkbox', function (message) {
  return this.test('test-name', message, (value) => !!value);
});

const name = Yup.string().required(t('required_name')).trim(t('required_name'));
const password = Yup.string()
  .required(t('required_password'))
  .trim(t('required_password'))
  .min(8, t('min_password'));

const checkBox = Yup.boolean().checkbox(t('required_privacy_policy'));

const confirmationCode = Yup.number().required('').min(4, '');

const shape = (rules) => Yup.object().shape(rules);

export const validation = {
  shape,
  password,
  name,
  checkBox,
  confirmationCode,
};
