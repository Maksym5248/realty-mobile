import React from 'react';
import { View } from 'react-native';

import { Text } from '~/components';

import { styles, colors } from '~/styles';

export const Stub = (props) => (
  <View style={styles.container}>
    <Text color={colors.placeholder} text="Stub" />
  </View>
);
