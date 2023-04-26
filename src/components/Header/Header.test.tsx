import {screen, render, fireEvent} from '../../test-utils';
import React from 'react';
import Header from './Header';

describe('Header Component', () => {
  it('should have a title', () => {
    render(<Header />);
    expect(screen.getByRole('heading', {name: /Media Library/i})).toBeTruthy();
  });

  it('should have two links', () => {
    render(<Header />);
    expect(screen.getByRole('link', {name: /Media list/i})).toBeTruthy();
    expect(screen.getByRole('link', {name: /Add New Media/i})).toBeTruthy();
  });

  it('should have logout action', () => {
    render(<Header />);
    expect(screen.getByTitle(/logout/i)).toBeTruthy();
  });

  it('should have light action to invert theme', () => {
    render(<Header />);

    expect(screen.getByTitle(/light/i)).toBeTruthy();
  });

  it('should have dark action when switching to light theme', () => {
    render(<Header />);

    fireEvent.click(screen.getByTitle(/light/i));

    expect(screen.getByTitle(/dark/i)).toBeTruthy();
  });
});
