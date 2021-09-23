import React from 'react';

import { observer } from 'mobx-react-lite';
import { View } from 'react-native';

import { SCREENS } from '~/constants';
import { useTranslate, useStore, useForm, useFocusInput } from '~/hooks';
import { Input, KeyboardAwareScrollView, Button, Text, Touchable } from '~/components';
import { validation } from '~/utils';
import { styles, colors } from '~/styles';
import { Navigation } from '~/services';

import { IFormValues } from './sign-in.types';
import { s } from './sign-in.styles';

const validationSchema = validation.shape({
  email: validation.email,
  password: validation.password,
});

export const SignIn = observer(() => {
  const store = useStore();
  const { t } = useTranslate({ prefix: 'sign_in' });
  const [refPassword, onEditedEmail] = useFocusInput();

  const onSubmit = (values: IFormValues) => {
    store?.auth?.signIn.run(values);
  };

  const { formik, fields } = useForm<IFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  const onGoToSignUp = () => {
    Navigation.navigate(SCREENS.SIGN_UP);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={s.headlineContainer}>
        <Text type="headline" text={t('title')} />
      </View>
      <Input
        label={t('email')}
        containerStyle={styles.marginBottomM}
        returnKeyType="next"
        onEndEditing={onEditedEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCompleteType="email"
        testID="email"
        {...fields.email}
      />
      <Input
        label={t('password')}
        containerStyle={styles.marginBottomLX}
        ref={refPassword}
        returnKeyType="done"
        autoCapitalize="none"
        secureTextEntry
        autoCompleteType="password"
        onSubmitEditing={formik.isValid ? formik.handleSubmit : undefined}
        testID="password"
        {...fields.password}
      />
      <Button
        loading={store?.auth?.signIn.inProgress}
        title={t('sign_in_btn')}
        onPress={formik.handleSubmit}
        disabled={!formik.isValid}
        testID="sign_in"
      />
      <Touchable onPress={onGoToSignUp} style={s.footerContainer} testID="touchable.go_to_sign_up">
        <Text color={colors.placeholder} text={`${t('sign_up_btn')}  `} />
        <Text color={colors.primary} text={t('to_reg_link')} />
      </Touchable>
    </KeyboardAwareScrollView>
  );
});
