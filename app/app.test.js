/**
 * @format
 */

import React from 'react';

// Note: test renderer must be required after react-native.
import { render } from '@testing-library/react-native';

import { App } from './app';

jest.useFakeTimers();

it('renders correctly', () => {
  render(<App />);
});
