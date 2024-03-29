import {screen, render, fireEvent} from '../../test-utils';
import React from 'react';
import LoginContainer from './LoginContainer';
import * as messages from '../../translations/fr.json';
import {vi} from 'vitest';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('LoginContainer', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should have all input without data', () => {
    render(<LoginContainer />);

    expect(screen.getByRole('heading', {name: messages['login_title']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account_email']})).toBeTruthy();
    expect(screen.getByLabelText(messages['account_password'])).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['register_title']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['reset_password_title']})).toBeTruthy();
  });

  it('should redirect to register page when clicking on register button', () => {
    render(<LoginContainer />);

    fireEvent.click(screen.getByRole('button', {name: messages['register_title']}));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/register');
  });

  it('should redirect to reset password page when clicking on reset password button', () => {
    render(<LoginContainer />);

    fireEvent.click(screen.getByRole('button', {name: messages['reset_password_title']}));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/reset-password');
  });
});
