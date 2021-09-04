import React from 'react';

import { View, ActivityIndicator } from 'react-native';

import { colors } from '~/styles';

import { s } from './spinner.styles';

export const Spinner = ({ isVisible, style, color = colors.primary }) =>
  !!isVisible && (
    <View style={[s.container, style]} pointerEvents="none">
      <ActivityIndicator size="large" color={color} />
    </View>
  );
