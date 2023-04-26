import {screen, render, fireEvent, waitFor} from '../../test-utils';
import React from 'react';
import RegisterForm from './RegisterForm';
import * as messages from '../../translations/fr.json';

describe('RegisterForm Component', () => {
  const mockHandleOnSubmit = jest.fn();

  it('should have all input without data', () => {
    render(<RegisterForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.getByRole('textbox', {name: messages['account.email']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['account.username']})).toBeTruthy();
    expect(screen.getByLabelText(messages['account.password'])).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
  });

  it('should show error message when required field is not filled', async () => {
    render(<RegisterForm handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.submit(screen.getByRole('button', {name: messages['submit']}));
    await waitFor(async () => {
      expect(await screen.findByText(messages['account.email.error'])).toBeTruthy();
      expect(await screen.findByText(messages['account.username.error'])).toBeTruthy();
      expect(await screen.findByText(messages['account.password.error'])).toBeTruthy();
    });
  });

  it('should call onSubmit function when clicking on submit button', async () => {
    render(<RegisterForm handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.change(screen.getByRole('textbox', {name: messages['account.email']}), {
      target: {value: 'test@test.com'},
    });

    fireEvent.change(screen.getByRole('textbox', {name: messages['account.username']}), {
      target: {value: 'testUser'},
    });

    fireEvent.change(screen.getByLabelText(messages['account.password']), {
      target: {value: 'password'},
    });

    fireEvent.submit(screen.getByRole('button', {name: messages['submit']}));

    expect(
      (screen.getByRole('textbox', {name: messages['account.username']}) as HTMLInputElement).value
    ).toEqual('testUser');

    expect(
      (screen.getByRole('textbox', {name: messages['account.email']}) as HTMLInputElement).value
    ).toEqual('test@test.com');

    expect((screen.getByLabelText(messages['account.password']) as HTMLInputElement).value).toEqual(
      'password'
    );

    await waitFor(() => {
      expect(mockHandleOnSubmit).toHaveBeenCalled();
    });
  });
});
