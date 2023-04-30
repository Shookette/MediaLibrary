import {screen, render, fireEvent, waitFor} from '../../test-utils';
import React from 'react';
import LoginForm from './LoginForm';
import * as messages from '../../translations/fr.json';

describe('LoginForm Component', () => {
  const mockHandleOnSubmit = jest.fn();

  it('should have all input without data', () => {
    render(<LoginForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.getByRole('textbox', {name: messages['account_email']})).toBeTruthy();
    expect(screen.getByLabelText(messages['account_password'])).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
  });

  it('should show error message when required field is not filled', async () => {
    render(<LoginForm handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.submit(screen.getByRole('button', {name: messages['submit']}));
    await waitFor(async () => {
      expect(await screen.findByText(messages['account_email_error'])).toBeTruthy();
      expect(await screen.findByText(messages['account_password_error'])).toBeTruthy();
    });
  });

  it('should call onSubmit function when clicking on submit button', async () => {
    render(<LoginForm handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.change(screen.getByRole('textbox', {name: messages['account_email']}), {
      target: {value: 'test@test.com'},
    });

    fireEvent.change(screen.getByLabelText(messages['account_password']), {
      target: {value: 'password'},
    });

    fireEvent.submit(screen.getByRole('button', {name: messages['submit']}));

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
