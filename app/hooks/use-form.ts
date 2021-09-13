import { useFormik, FormikConfig } from 'formik';
import { NativeSyntheticEvent, TextInput } from 'react-native';

import { useLocalization } from './context/use-localization';

interface Field {
  value: string;
  onChangeValue: (value: string) => void;
  message: string;
  isValid: boolean;
  onBlur: (value: NativeSyntheticEvent<TextInput>) => void;
}

interface Fields {
  [name: string]: Field;
}

export const useForm = <T>(config: FormikConfig<T>) => {
  const { t } = useLocalization();
  const formik = useFormik({
    validateOnMount: true,
    ...config,
  });

  const getField = (name: string): Field => {
    const isValid = !(!!formik.errors[name] && formik.touched[name]);

    return {
      value: formik.values[name],
      message: !isValid ? t(formik.errors[name]) : '',
      onChangeValue: (value) => formik.setFieldValue(name, value),
      isValid: !(!!formik.errors[name] && formik.touched[name]),
      onBlur: formik.handleBlur(name),
    };
  };

  const fields = formik.values
    ? Object.keys(formik.values).reduce((prev: Fields, key: string) => {
        prev[key] = getField(key);
        return prev;
      }, {})
    : {};

  return {
    formik,
    fields,
  };
};
