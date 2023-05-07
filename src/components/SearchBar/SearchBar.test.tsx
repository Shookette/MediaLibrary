import {screen, render, fireEvent} from '../../test-utils';
import React from 'react';
import SearchBar from './SearchBar';
import {vi} from 'vitest';

describe('SearchBar Component', () => {
  it('should have an input', () => {
    const onChange = vi.fn();
    render(<SearchBar handleOnChange={onChange} />);
    const searchInput = screen.getByRole('textbox', {});
    expect(searchInput).toBeTruthy();
  });

  it('should call the onChange function when text is tapped', () => {
    const onChange = vi.fn();
    render(<SearchBar handleOnChange={onChange} />);
    const searchInput = screen.getByRole('textbox', {});
    fireEvent.change(searchInput, {target: {value: 'my search'}});
    expect(onChange).toHaveBeenCalled();
  });
});
