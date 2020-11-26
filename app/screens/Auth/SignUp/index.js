// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';

import { useLocalization } from '~/localization';
import { useStores } from '~/store';
import { Input, KeyboardAwareScrollView, Button, Text } from '~/components';
import { useForm, useFocusInput } from '~/hooks';
import { validation } from '~/utils';
import { styles } from '~/styles';

import { s } from './styles';
import { type SignUpProps } from './types';

const validationSchema = validation.shape({
  email: validation.email,
  password: validation.password,
});

export const SignUp = observer((props: SignUpProps) => {
  const store = useStores();
  const { t } = useLocalization({ screen: 'sign_up' });
  const [refPassword, onEditedEmail] = useFocusInput();

  const onSubmit = ({ confirm, phone, ...values }) => {
    store?.auth?.signUp.run(values);
  };

  const { formik, fields } = useForm({
    initialValues: {
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
        title={t('sign_up_btn')}
        onPress={() => console.log('Pressed')}
        disabled={!formik.isValid}
      />
    </KeyboardAwareScrollView>
  );
});
