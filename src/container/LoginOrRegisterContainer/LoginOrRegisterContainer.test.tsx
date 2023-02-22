import {screen, render, fireEvent} from '@testing-library/react';
import React from 'react';
import LoginOrRegisterContainer from './LoginOrRegisterContainer';
import UserProvider from '../../hooks/UserContext';
import WithFirestore from '../../components/WithFirestore';
import {BrowserRouter} from 'react-router-dom';

describe('LoginOrRegister Component', () => {
  it('should have all input without data', () => {
    render(
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <LoginOrRegisterContainer />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    );

    expect(screen.getByRole('heading', {name: /Login/i})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: /Email/i})).toBeTruthy();
    expect(screen.getByLabelText(/Password/i)).toBeTruthy();
    expect(screen.getByRole('button', {name: /Submit/i})).toBeTruthy();
    expect(screen.getByRole('button', {name: /Register/i})).toBeTruthy();
  });

  it('should change the form to register form when clicking on register button', () => {
    render(
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <LoginOrRegisterContainer />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    );

    fireEvent.click(screen.getByRole('button', {name: /Register/i}));

    expect(screen.getByRole('heading', {name: /Register/i})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: /Email/i})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: /Username/i})).toBeTruthy();
    expect(screen.getByLabelText(/Password/i)).toBeTruthy();
    expect(screen.getByRole('button', {name: /Submit/i})).toBeTruthy();
  });
});
