// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';

import { useStore } from '~/store';
import { useLocalization } from '~/localization';

import { Button } from '~/components';

import { styles } from '~/styles';

import { s } from './settings.styles';
import { SettingsProps } from './settings.types';

export const Settings = observer((props: SettingsProps) => {
  const store = useStore();
  const { t } = useLocalization({ screen: 'settings' });

  const onSignOut = () => {
    store?.auth?.signOut.run();
  };

  return (
    <View style={[styles.container, s.container]}>
      <Button
        title={t('sign_out')}
        mode="text"
        onPress={onSignOut}
        loading={store?.auth?.signOut.inProgress}
      />
    </View>
  );
});
