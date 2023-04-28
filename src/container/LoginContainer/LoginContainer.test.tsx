import {screen, render, fireEvent} from '../../test-utils';
import React from 'react';
import LoginContainer from './LoginContainer';
import * as messages from '../../translations/fr.json';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('LoginOrRegister Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have all input without data', () => {
    render(<LoginContainer />);

    expect(screen.getByRole('heading', {name: messages['login.title']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account.email']})).toBeTruthy();
    expect(screen.getByLabelText(messages['account.password'])).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['register.title']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['reset-password.title']})).toBeTruthy();
  });

  it('should redirect to register page when clicking on register button', () => {
    render(<LoginContainer />);

    fireEvent.click(screen.getByRole('button', {name: messages['register.title']}));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/register');
  });

  it('should redirect to reset password page when clicking on reset password button', () => {
    render(<LoginContainer />);

    fireEvent.click(screen.getByRole('button', {name: messages['reset-password.title']}));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/reset-password');
  });
});
