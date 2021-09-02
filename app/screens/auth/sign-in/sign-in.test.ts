import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';

import { SignIn } from './sign-in';

const waitForUpdateState = () => act(() => new Promise((resolve) => setImmediate(resolve)));

// submit failed and success
// button valid

jest.useFakeTimers();

describe('Screen: sign-in', () => {
  it('renders default elements and initial state', async () => {
    const { getByTestId } = render(<SignIn />);

    getByTestId('input.email');
    getByTestId('input.password');
    getByTestId('button.sign_in');
    getByTestId('touchable.go_to_sign_up');

    await waitForUpdateState();

    expect(getByTestId('button.sign_in')).toBeDisabled();
  });

  it('renders message if email is not valid', async () => {
    const { getByTestId, queryAllByTestId } = render(<SignIn />);

    fireEvent(getByTestId('input.email'), 'onChangeValue', 'test');
    fireEvent(getByTestId('input.email'), 'onBlur', { target: 45, text: 'test', eventCount: 1 });

    await waitForUpdateState();

    expect(queryAllByTestId('input.email.message').length).toBe(1);
    expect(getByTestId('button.sign_in')).toBeDisabled();
  });

  it('renders message if password is not valid', async () => {
    const { getByTestId, queryAllByTestId } = render(<SignIn />);

    fireEvent(getByTestId('input.password'), 'onChangeValue', 'test');
    fireEvent(getByTestId('input.password'), 'onBlur', { target: 45, text: 'test', eventCount: 1 });

    await waitForUpdateState();

    expect(queryAllByTestId('input.password.message').length).toBe(1);
    expect(getByTestId('button.sign_in')).toBeDisabled();
  });
});
