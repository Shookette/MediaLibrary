import {screen, render, fireEvent} from '@testing-library/react';
import React from 'react';
import Header from './Header';
import {BrowserRouter} from 'react-router-dom';
import UserProvider from '../../hooks/UserContext';
import WithFirestore from '../WithFirestore';

describe('Header Component', () => {
  it('should have a title', () => {
    render(
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    );
    expect(screen.getByRole('heading', {name: /Media Library/i})).toBeTruthy();
  });

  it('should have two links', () => {
    render(
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    );
    expect(screen.getByRole('link', {name: /Media list/i})).toBeTruthy();
    expect(screen.getByRole('link', {name: /Add New Media/i})).toBeTruthy();
  });

  it('should have logout action', () => {
    render(
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    );
    expect(screen.getByTitle(/logout/i)).toBeTruthy();
  });

  it('should have light action to invert theme', () => {
    render(
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    );

    expect(screen.getByTitle(/light/i)).toBeTruthy();
  });

  it('should have dark action when switching to light theme', () => {
    render(
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    );

    fireEvent.click(screen.getByTitle(/light/i));

    expect(screen.getByTitle(/dark/i)).toBeTruthy();
  });
});
