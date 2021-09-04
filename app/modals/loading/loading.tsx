import React, { memo } from 'react';

import { View } from 'react-native';

import { Spinner } from '~/components';
import { colors } from '~/styles';

import { s } from './loading.styles';

export const Loading = memo(() => (
  <View style={s.container}>
    <Spinner isVisible color={colors.white} />
  </View>
));
