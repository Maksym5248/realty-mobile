import React from 'react';

import { observer } from 'mobx-react-lite';
import { View } from 'react-native';

import { useLocale, useStore, useForm, useFocusInput } from '~/hooks';
import { Input, KeyboardAwareScrollView, Button, Text } from '~/components';
import { validation } from '~/utils';
import { styles } from '~/styles';

import { s } from './sign-up.styles';
import { IFormValues } from './sign-up.types';

const validationSchema = validation.shape({
  name: validation.name,
  email: validation.email,
  password: validation.password,
});

export const SignUp = observer(() => {
  const store = useStore();
  const { t } = useLocale({ prefix: 'sign_up' });
  const [refPassword, onEditedEmail] = useFocusInput();
  const [refEmail, onEditedName] = useFocusInput();

  const onSubmit = (values: IFormValues) => {
    store?.auth?.signUp.run(values);
  };

  const { formik, fields } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={s.headlineContainer}>
        <Text type="headline" text={t('title')} />
      </View>
      <Input
        label={t('name')}
        containerStyle={styles.marginBottomM}
        returnKeyType="next"
        onEndEditing={onEditedName}
        testID="name"
        {...fields.name}
      />
      <Input
        label={t('email')}
        testID="email"
        autoCapitalize="none"
        containerStyle={styles.marginBottomM}
        returnKeyType="next"
        onEndEditing={onEditedEmail}
        keyboardType="email-address"
        autoCompleteType="email"
        ref={refEmail}
        {...fields.email}
      />
      <Input
        label={t('password')}
        testID="password"
        containerStyle={styles.marginBottomLX}
        ref={refPassword}
        returnKeyType="done"
        autoCapitalize="none"
        secureTextEntry
        autoCompleteType="password"
        onSubmitEditing={formik.isValid ? formik.handleSubmit : undefined}
        {...fields.password}
      />
      <Button
        loading={store?.auth?.signUp.inProgress}
        title={t('sign_up_btn')}
        onPress={formik.handleSubmit}
        disabled={!formik.isValid}
        testID="sign_up"
      />
    </KeyboardAwareScrollView>
  );
});
