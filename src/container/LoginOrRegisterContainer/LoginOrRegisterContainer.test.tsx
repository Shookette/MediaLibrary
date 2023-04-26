import {screen, render, fireEvent} from '../../test-utils';
import React from 'react';
import LoginOrRegisterContainer from './LoginOrRegisterContainer';
import * as messages from '../../translations/fr.json';

describe('LoginOrRegister Component', () => {
  it('should have all input without data', () => {
    render(<LoginOrRegisterContainer />);

    expect(screen.getByRole('heading', {name: messages['login.title']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account.email']})).toBeTruthy();
    expect(screen.getByLabelText(messages['account.password'])).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['register.title']})).toBeTruthy();
  });

  it('should change the form to register form when clicking on register button', () => {
    render(<LoginOrRegisterContainer />);

    fireEvent.click(screen.getByRole('button', {name: messages['register.title']}));

    expect(screen.getByRole('heading', {name: messages['register.title']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account.email']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account.username']})).toBeTruthy();
    expect(screen.getByLabelText(messages['account.password'])).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
  });
});
