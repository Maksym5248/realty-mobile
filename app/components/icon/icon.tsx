import React, { Fragment } from 'react';

import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { IconProps } from './icon.types';

const icons = {
  Ionicons,
};

export const Icon = ({
  type = 'Ionicons',
  name = '',
  size = 22,
  color = 'black',
  style,
  containerStyle,
  onPress,
  disabled,
  disabledColor = 'grey',
}: IconProps) => {
  const CurrentIcon = icons[type];
  const isContainer = containerStyle || onPress;

  const Container = isContainer ? TouchableOpacity : Fragment;

  const containerProps = isContainer
    ? { style: containerStyle, onPress: disabled ? undefined : onPress }
    : {};

  return (
    <Container {...containerProps}>
      <CurrentIcon name={name} size={size} style={style} color={disabled ? disabledColor : color} />
    </Container>
  );
};
