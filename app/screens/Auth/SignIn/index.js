// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';

import { useLocalization } from '~/localization';
import { useStores } from '~/store';
import { Input, KeyboardAwareScrollView, Button, Text, Touchable } from '~/components';
import { useForm, useFocusInput } from '~/hooks';
import { validation } from '~/utils';
import { styles, colors } from '~/styles';
import { NavigationService } from '~/services';
import { screens } from '~/constants';

import { s } from './styles';
import { type SignUpProps } from './types';

const validationSchema = validation.shape({
  email: validation.email,
  password: validation.password,
});

export const SignIn = observer((props: SignUpProps) => {
  const store = useStores();
  const { t } = useLocalization({ screen: 'sign_in' });
  const [refPassword, onEditedEmail] = useFocusInput();

  const onSubmit = ({ confirm, phone, ...values }) => {
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
    NavigationService.navigate(screens.SignUp);
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
        keyboardType="email-address"
        autoCompleteType="email"
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
        {...fields.password}
      />
      <Button
        title={t('sign_in_btn')}
        onPress={() => console.log('Pressed')}
        disabled={!formik.isValid}
      />
      <Touchable onPress={onGoToSignUp} style={s.footerContainer}>
        <Text color={colors.placeholder} text={`${t('sign_up_btn')}  `} />
        <Text color={colors.primary} text={t('to_reg_link')} />
      </Touchable>
    </KeyboardAwareScrollView>
  );
});
