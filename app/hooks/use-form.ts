import { useFormik, FormikConfig } from 'formik';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { useLocale } from './context/use-locale';

interface Field {
  value: any;
  onChangeValue: (value: string) => void;
  message: string;
  isValid: boolean;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

interface Fields {
  [name: string]: Field;
}

export function useForm<T>(config: FormikConfig<T>) {
  const { t } = useLocale();
  const formik = useFormik<T>({
    validateOnMount: true,
    ...config,
  });

  const getField = (name: keyof T): Field => {
    const isValid = !(!!formik.errors[name] && formik.touched[name]);

    return {
      value: formik.values[name],
      message: !isValid ? t(formik.errors[name] as string) : '',
      onChangeValue: (value) => formik.setFieldValue(name as string, value),
      isValid: !(!!formik.errors[name] && formik.touched[name]),
      onBlur: formik.handleBlur(name) as (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    };
  };

  const fields = (formik.values
    ? Object.keys(formik.values).reduce((prev: Fields, key: string) => {
        prev[key] = getField(key as keyof T);
        return prev;
      }, {})
    : {}) as Record<keyof T, Field>;

  return {
    formik,
    fields,
  };
}
