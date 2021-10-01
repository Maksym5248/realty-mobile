import React from 'react';

export interface ScrollViewProps {
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  children?: React.ReactChildren;
}
