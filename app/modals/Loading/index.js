// @flow
import React, { memo } from 'react';
import { View } from 'react-native';
import { Spinner } from '~/components';
import { colors } from '~/styles';

import { type LoadingProps } from './types';

import { s } from './styles';
export const Loading = memo<LoadingProps>((props: LoadingProps) => {
  return (
    <View style={s.container}>
      <Spinner isVisible color={colors.white} />
    </View>
  );
});
