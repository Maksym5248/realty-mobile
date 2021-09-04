import React from 'react';

import { observer } from 'mobx-react';
import { View } from 'react-native';

import { Text } from '~/components';
import { styles, colors } from '~/styles';

export const Main = observer(() => (
  <View style={styles.container}>
    <Text color={colors.placeholder} text="Main" />
  </View>
));
