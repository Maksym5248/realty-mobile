import React from 'react';

import { observer } from 'mobx-react';
import { View } from 'react-native';

import { useLocalization } from '~/localization';
import { useStore } from '~/store';
import { Input, KeyboardAwareScrollView, Button, Text, Touchable } from '~/components';
import { useForm, useFocusInput } from '~/hooks';
import { validation } from '~/utils';
import { styles, colors } from '~/styles';
import { Navigation } from '~/services';
import { screens } from '~/constants';

import { s } from './sign-in.styles';

const validationSchema = validation.shape({
  email: validation.email,
  password: validation.password,
});

export const SignIn = observer(() => {
  const store = useStore();
  const { t } = useLocalization({ screen: 'sign_in' });
  const [refPassword, onEditedEmail] = useFocusInput();

  const onSubmit = (values) => {
    store?.auth?.signIn.run(values);
  };

  const { formik, fields } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  const onGoToSignUp = () => {
    Navigation.navigate(screens.SignUp);
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
        testID="input.email"
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
        testID="input.password"
        {...fields.password}
      />
      <Button
        loading={store?.auth?.signIn.inProgress}
        title={t('sign_in_btn')}
        onPress={formik.handleSubmit}
        disabled={!formik.isValid}
        testID="button.sign_in"
      />
      <Touchable onPress={onGoToSignUp} style={s.footerContainer} testID="touchable.go_to_sign_up">
        <Text color={colors.placeholder} text={`${t('sign_up_btn')}  `} />
        <Text color={colors.primary} text={t('to_reg_link')} />
      </Touchable>
    </KeyboardAwareScrollView>
  );
});
