import {screen, render, fireEvent} from '../../test-utils';
import React from 'react';
import RegisterContainer from './RegisterContainer';
import * as messages from '../../translations/fr.json';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));
describe('Register Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have all input without data', () => {
    render(<RegisterContainer />);

    expect(screen.getByRole('heading', {name: messages['register_title']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account_email']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account_username']})).toBeTruthy();
    expect(screen.getByLabelText(messages['account_password'])).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['login_title']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['reset-password_title']})).toBeTruthy();
  });

  it('should change the form to login form when clicking on login button', () => {
    render(<RegisterContainer />);

    fireEvent.click(screen.getByRole('button', {name: messages['login_title']}));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });

  it('should redirect to reset password page when clicking on reset password button', () => {
    render(<RegisterContainer />);

    fireEvent.click(screen.getByRole('button', {name: messages['reset-password_title']}));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/reset-password');
  });
});
