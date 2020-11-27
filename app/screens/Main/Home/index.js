// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';

import { useStore } from '~/store';
import { Text } from '~/components';

import { styles, colors } from '~/styles';

import { s } from './styles';
import { type HomeProps } from './types';

export const Home = observer((props: HomeProps) => {
  const store = useStore();

  return (
    <View style={styles.container}>
      <Text color={colors.placeholder} text="home" />
    </View>
  );
});
