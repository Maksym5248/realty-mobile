import * as Yup from 'yup';

const withPrefix = (v: string) => `errors.${v}`;

const password = Yup.string().required(withPrefix('required')).min(8, withPrefix('min'));
const name = Yup.string().required(withPrefix('required')).min(2, withPrefix('min'));

const email = Yup.string()
  .email(withPrefix('incorrect'))
  .required(withPrefix('required'))
  .trim(withPrefix('required'));

const shape = (fields: object) => Yup.object().shape(fields);

export const validation = {
  shape,
  password,
  email,
  name,
};
