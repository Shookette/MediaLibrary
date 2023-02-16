import {screen, render, fireEvent} from '@testing-library/react';
import React from 'react';
import Button from './Button';

describe('Button Component', () => {
  it('should render with a label as children with primary display type', () => {
    const {container} = render(
      <Button displayType="primary" type="button">
        label
      </Button>
    );
    expect(screen.getByRole('button', {name: /label/i})).toBeTruthy();
    expect(container.getElementsByClassName('button--primary')).toBeTruthy();
    expect(container.querySelector('.button')?.getAttribute('type')).toEqual('button');
  });

  it('should render with a label as children with secondary display type', () => {
    const {container} = render(
      <Button displayType="secondary" type="button">
        label
      </Button>
    );
    expect(screen.getByRole('button', {name: /label/i})).toBeTruthy();
    expect(container.getElementsByClassName('button--secondary')).toBeTruthy();
  });

  it('should render with submit type', () => {
    const {container} = render(
      <Button displayType="secondary" type="submit">
        label
      </Button>
    );
    expect(container.querySelector('.button')?.getAttribute('type')).toEqual('submit');
  });

  it('should render with reset type', () => {
    const {container} = render(
      <Button displayType="secondary" type="reset">
        label
      </Button>
    );
    expect(container.querySelector('.button')?.getAttribute('type')).toEqual('reset');
  });

  it('should trigger handleFunction on Click', () => {
    const mockHandleOnClick = jest.fn();
    render(
      <Button displayType="secondary" type="button" handleOnClick={mockHandleOnClick}>
        label
      </Button>
    );

    fireEvent.click(screen.getByText(/label/i));
    expect(mockHandleOnClick).toHaveBeenCalled();
  });
});
