import { useFormik } from 'formik';

import { useLocalization } from '~/localization';

export const useForm = (params = {}) => {
  const { t } = useLocalization();
  const formik = useFormik({
    isInitialValid: false,
    ...params,
  });

  const getField = (name) => {
    const isValid = !(!!formik.errors[name] && formik.touched[name]);

    return {
      value: formik.values[name],
      message: !isValid ? t(formik.errors[name]) : '',
      onChangeValue: (value) => formik.setFieldValue(name, value),
      isValid: !(!!formik.errors[name] && formik.touched[name]),
      onBlur: formik.handleBlur(name),
    };
  };

  const fields = Object.keys(formik.values).reduce((prev, key) => {
    prev[key] = getField(key);
    return prev;
  }, {});

  return {
    formik,
    fields,
  };
};
