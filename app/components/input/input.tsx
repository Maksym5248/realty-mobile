import React, { forwardRef, RefObject } from 'react';

import { View, UIManager, LayoutAnimation, TextInput as RNTextInput } from 'react-native';
import { TextInput } from 'react-native-paper';

import { colors } from '~/styles';
import { useOnChange } from '~/hooks';
import { layoutConfig } from '~/utils';

import { Text } from '../text';
import { IInputProps } from './input.types';
import { s } from './input.styles';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export const Input = forwardRef(
  (
    { onChangeValue, containerStyle, style, isValid, message, testID, ...rest }: IInputProps,
    ref: RefObject<RNTextInput>,
  ) => {
    useOnChange(() => {
      LayoutAnimation.configureNext(layoutConfig.keyboard);
    }, [isValid]);

    return (
      <View style={containerStyle}>
        <TextInput
          testID={`input.${testID}`}
          {...rest}
          mode="outlined"
          error={!isValid}
          style={[s.style, style]}
          ref={ref}
          onChangeText={onChangeValue}
        />
        {!!message && (
          <Text
            testID={`input.${testID}.message`}
            type="caption"
            color={isValid ? colors.placeholder : colors.error}
            style={s.message}
            text={message}
          />
        )}
      </View>
    );
  },
);
