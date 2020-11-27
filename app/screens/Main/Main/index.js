// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';

import { useStore } from '~/store';
import { Text } from '~/components';

import { styles, colors } from '~/styles';

import { s } from './styles';
import { type MainProps } from './types';

export const Main = observer((props: MainProps) => {
  const store = useStore();

  return (
    <View style={styles.container}>
      <Text color={colors.placeholder} text="Main" />
    </View>
  );
});
