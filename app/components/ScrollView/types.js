// @flow
import { type Node } from 'react';

export type ScrollViewProps = {
  isLoading: boolean,
  isRefreshing: boolean,
  onRefresh: () => void,
  children?: Node,
};
