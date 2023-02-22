import {screen, render, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';
import RegisterForm from './RegisterForm';

describe('RegisterForm Component', () => {
  const mockHandleOnSubmit = jest.fn();

  it('should have all input without data', () => {
    render(<RegisterForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.getByRole('textbox', {name: /Email/i})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: /Username/i})).toBeTruthy();
    expect(screen.getByLabelText(/Password/i)).toBeTruthy();
    expect(screen.getByRole('button', {name: /Submit/i})).toBeTruthy();
  });

  it('should show error message when required field is not filled', async () => {
    render(<RegisterForm handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.submit(screen.getByRole('button', {name: /Submit/i}));
    await waitFor(async () => {
      expect(await screen.findByText(/Email is required/i)).toBeTruthy();
      expect(await screen.findByText(/Username is required/i)).toBeTruthy();
      expect(await screen.findByText(/Password is required/i)).toBeTruthy();
    });
  });

  it('should call onSubmit function when clicking on submit button', async () => {
    render(<RegisterForm handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.change(screen.getByRole('textbox', {name: /Email/i}), {
      target: {value: 'test@test.com'},
    });

    fireEvent.change(screen.getByRole('textbox', {name: /Username/i}), {
      target: {value: 'testUser'},
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: {value: 'password'},
    });

    fireEvent.submit(screen.getByRole('button', {name: /Submit/i}));

    expect((screen.getByRole('textbox', {name: /Username/i}) as HTMLInputElement).value).toEqual(
      'testUser'
    );

    expect((screen.getByRole('textbox', {name: /Email/i}) as HTMLInputElement).value).toEqual(
      'test@test.com'
    );

    expect((screen.getByLabelText(/Password/i) as HTMLInputElement).value).toEqual('password');

    await waitFor(() => {
      expect(mockHandleOnSubmit).toHaveBeenCalled();
    });
  });
});
