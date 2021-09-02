import React, { memo } from 'react';
import { View } from 'react-native';
import { Spinner } from '~/components';
import { colors } from '~/styles';

import { LoadingProps } from './loading.types';

import { s } from './loading.styles';

export const Loading = memo<LoadingProps>((props: LoadingProps) => (
  <View style={s.container}>
    <Spinner isVisible color={colors.white} />
  </View>
));
