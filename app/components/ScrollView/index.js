// @flow
import React from 'react';
import { ScrollView as ScrollViewRN, RefreshControl } from 'react-native';

import { colors } from '~/styles';

import { Spinner } from '../Spinner';

import { type ScrollViewProps } from './types';
import { s } from './styles';

export const ScrollView = ({
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  children,
  ...props
}: ScrollViewProps) => {
  return (
    <>
      {/* $FlowFixMe */}
      <ScrollViewRN
        refreshControl={
          onRefresh ? (
            <RefreshControl
              tintColor={colors.primaryLight}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          ) : undefined
        }
        {...props}>
        {isLoading ? undefined : children}
      </ScrollViewRN>
      <Spinner isVisible={isLoading} style={s.spinner} />
    </>
  );
};
