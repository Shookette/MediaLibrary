import {screen, render} from '@testing-library/react'
import React from 'react';
import Header from "./Header";
import {BrowserRouter} from "react-router-dom";

describe('Header Component', () => {
  it('should have a title', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', {name: /Media Library/i})).toBeTruthy();
  });

  it('should have two links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', {name: /Media list/i})).toBeTruthy();
    expect(screen.getByRole('link', {name: /Add New Media/i})).toBeTruthy();
  });
});
