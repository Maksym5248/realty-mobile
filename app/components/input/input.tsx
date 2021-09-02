import React, { forwardRef, Ref } from 'react';
import { View, UIManager, LayoutAnimation } from 'react-native';
import { TextInput } from 'react-native-paper';

import { colors } from '~/styles';
import { useOnChange } from '~/hooks';
import { layoutConfig } from '~/utils';

import { Text } from '../text';

import { InputProps } from './input.types';
import { s } from './input.styles';

UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

const InputComponent = (
  {
    onChangeValue, containerStyle, style, isValid, message, testID, ...rest
  }: InputProps,
  ref: Ref<typeof TextInput>,
) => {
  useOnChange(() => {
    LayoutAnimation.configureNext(layoutConfig.keyboard);
  }, [isValid]);

  return (
    <View style={containerStyle}>
      <TextInput
        testID={testID}
        {...rest}
        mode="outlined"
        error={!isValid}
        style={[s.style, style]}
        ref={ref}
        onChangeText={onChangeValue}
      />
      {!!message && (
        <Text
          testID={`${testID}.message`}
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
