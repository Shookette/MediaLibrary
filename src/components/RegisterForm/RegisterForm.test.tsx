import {screen, render, fireEvent, waitFor} from '../../test-utils';
import React from 'react';
import RegisterForm from './RegisterForm';
import * as messages from '../../translations/fr.json';

describe('RegisterForm Component', () => {
  const mockHandleOnSubmit = jest.fn();

  it('should have all input without data', () => {
    render(<RegisterForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.getByRole('textbox', {name: messages['account_email']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account_username']})).toBeTruthy();
    expect(screen.getByLabelText(messages['account_password'])).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
  });

  it('should show error message when required field is not filled', async () => {
    render(<RegisterForm handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.submit(screen.getByRole('button', {name: messages['submit']}));
    await waitFor(async () => {
      expect(await screen.findByText(messages['account_email_error'])).toBeTruthy();
      expect(await screen.findByText(messages['account_username_error'])).toBeTruthy();
      expect(await screen.findByText(messages['account_password_error'])).toBeTruthy();
    });
  });

  it('should call onSubmit function when clicking on submit button', async () => {
    render(<RegisterForm handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.change(screen.getByRole('textbox', {name: messages['account_email']}), {
      target: {value: 'test@test.com'},
    });

    fireEvent.change(screen.getByRole('textbox', {name: messages['account_username']}), {
      target: {value: 'testUser'},
    });

    fireEvent.change(screen.getByLabelText(messages['account_password']), {
      target: {value: 'password'},
    });

    fireEvent.submit(screen.getByRole('button', {name: messages['submit']}));

    expect(
      (screen.getByRole('textbox', {name: messages['account_username']}) as HTMLInputElement).value
    ).toEqual('testUser');

    expect(
      (screen.getByRole('textbox', {name: messages['account_email']}) as HTMLInputElement).value
    ).toEqual('test@test.com');

    expect((screen.getByLabelText(messages['account_password']) as HTMLInputElement).value).toEqual(
      'password'
    );

    await waitFor(() => {
      expect(mockHandleOnSubmit).toHaveBeenCalled();
    });
  });
});
