import React from 'react';

import { View } from 'react-native';

import { s } from './separator.styles';
import { SeparatorProps } from './separator.types';

const types = {
  horizontal: s.horizontal,
  vertical: s.vertical,
};

export const Separator = ({ type = 'horizontal', style }: SeparatorProps) => {
  const typeStyle = types[type];

  return <View style={[typeStyle, style]} />;
};
