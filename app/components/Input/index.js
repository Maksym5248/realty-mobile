// @flow
import React, { forwardRef, type Ref } from 'react';
import { View, UIManager, LayoutAnimation } from 'react-native';
import { TextInput } from 'react-native-paper';

import { colors } from '~/styles';
import { useOnChange } from '~/hooks';
import { layoutConfig } from '~/utils';

import { Text } from '../Text';

import { type InputProps } from './types';
import { s } from './styles';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export const InputComponent = (
  { onChangeValue, containerStyle, style, isValid, message, ...rest }: InputProps,
  ref: Ref<typeof TextInput>,
) => {
  useOnChange(() => {
    LayoutAnimation.configureNext(layoutConfig.keyboard);
  }, [isValid]);

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
