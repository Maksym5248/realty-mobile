// @flow
import React, { forwardRef, type Ref } from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

import { colors } from '~/styles';

import { Text } from '../Text';

import { type InputProps } from './types';
import { s } from './styles';

export const InputComponent = (
  { onChangeValue, containerStyle, style, isValid, message, ...rest }: InputProps,
  ref: Ref<typeof TextInput>,
) => {
  return (
    <View style={containerStyle}>
      <TextInput
        {...rest}
        mode="outlined"
        error={!isValid}
        style={[s.style, style]}
        ref={ref}
        onChangeText={onChangeValue}
      />
      {!!message && (
        <Text
          type="caption"
          color={isValid ? colors.placeholder : colors.error}
          style={s.message}
          text={message}
        />
      )}
    </View>
  );
};

export const Input = forwardRef<InputProps, typeof InputComponent>(InputComponent);
