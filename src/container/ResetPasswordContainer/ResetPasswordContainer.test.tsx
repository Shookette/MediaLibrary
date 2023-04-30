import {screen, render, fireEvent} from '../../test-utils';
import React from 'react';
import * as messages from '../../translations/fr.json';
import ResetPasswordContainer from './ResetPasswordContainer';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));
describe('Reset Password Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have all input without data', () => {
    render(<ResetPasswordContainer />);

    expect(screen.getByRole('heading', {name: messages['reset-password_title']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account_email']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['login_title']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['register_title']})).toBeTruthy();
  });

  it('should change the form to login form when clicking on login button', () => {
    render(<ResetPasswordContainer />);

    fireEvent.click(screen.getByRole('button', {name: messages['login_title']}));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });

  it('should redirect to register page when clicking on register button', () => {
    render(<ResetPasswordContainer />);

    fireEvent.click(screen.getByRole('button', {name: messages['register_title']}));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/register');
  });
});
