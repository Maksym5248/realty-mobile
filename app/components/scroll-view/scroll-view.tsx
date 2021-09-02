import React from 'react';
import { ScrollView as ScrollViewRN, RefreshControl } from 'react-native';

import { colors } from '~/styles';

import { Spinner } from '../spinner';

import { ScrollViewProps } from './scroll-view.types';
import { s } from './scroll-view.styles';

export const ScrollView = ({
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  children,
  ...props
}: ScrollViewProps) => (
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
      {...props}
    >
      {isLoading ? undefined : children}
    </ScrollViewRN>
    <Spinner isVisible={isLoading} style={s.spinner} />
  </>
);
