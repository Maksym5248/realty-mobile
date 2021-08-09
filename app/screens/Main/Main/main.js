// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';

import { Text } from '~/components';

import { styles, colors } from '~/styles';

import { type MainProps } from './types';

export const Main = observer((props: MainProps) => {
  return (
    <View style={styles.container}>
      <Text color={colors.placeholder} text="Main" />
    </View>
  );
});
