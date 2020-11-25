// @flow
import React from 'react';
import { observer } from 'mobx-react-lite';

import { useLocalization } from '~/localization';
import { useStores } from '~/store';
import { Text, KeyboardAwareScrollView, Button } from '~/components';
import { useForm, useFocusInput } from '~/hooks';
import { validation } from '~/utils';
import { styles } from '~/styles';

import { s } from './styles';
import { type SignUpProps } from './types';

const validationSchema = validation.shape({
  password: validation.password,
  name: validation.name,
});

const icons = {
  check: {
    name: 'checkmark-sharp',
    size: 24,
  },
};

export const SignUp = observer((props: SignUpProps) => {
  const store = useStores();
  const { translate } = useLocalization({ screen: 'sign_up' });
  const [refPhone, onEditedName] = useFocusInput();
  const [refPassword, onEditedPhone] = useFocusInput();

  const onSignUp = ({ confirm, phone, ...values }) => {
    store?.auth?.signUp.run({
      ...values,
      phone: phone.replace('+', ''),
      confirm: confirm ? 'yes' : 'no',
    });
  };

  const { formik, fields } = useForm({
    initialValues: {
      name: '',
      phone: '',
      password: '',
      confirm: false,
    },
    validationSchema,
    onSubmit: onSignUp,
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Button title={translate('sign_up_btn')} onPress={() => console.log('Pressed')} />
    </KeyboardAwareScrollView>
  );
});
