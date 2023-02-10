import {screen, render, fireEvent} from '@testing-library/react'
import React from 'react';
import SearchBar from "./SearchBar";

describe('SearchBar Component', () => {
  it('should have an input', () => {
    const onChange = jest.fn();
    render(<SearchBar handleOnChange={onChange} />);
    const searchInput = screen.getByRole('textbox', {});
    expect(searchInput).toBeTruthy();
  });

  it('should call the onChange function when text is tapped', () => {
    const onChange = jest.fn();
    render(<SearchBar handleOnChange={onChange} />);
    const searchInput = screen.getByRole('textbox', {});
    fireEvent.change(searchInput, {target: {value: 'my search'}});
    expect(onChange).toHaveBeenCalled();
  });
});
