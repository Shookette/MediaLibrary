import {screen, render, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';
import UserProvider from '../../hooks/UserContext';
import WithFirestore from '../../components/WithFirestore';
import {BrowserRouter} from 'react-router-dom';
import MediaNew from './MediaNew';
import * as MediaRepository from '../../repository/MediaRepository';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('MediaNew Component', () => {
  let spySetMedia: jest.SpyInstance;
  beforeEach(() => {
    spySetMedia = jest.spyOn(MediaRepository, 'setMedia').mockReturnValue(Promise.resolve());
  });

  it('should have all input without data', () => {
    render(
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <MediaNew />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    );

    expect(screen.getByRole('heading', {name: /Add new media/i})).toBeTruthy();
  });

  it('should save the media when submitting the form', async () => {
    render(
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <MediaNew />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    );

    fireEvent.change(screen.getByRole('textbox', {name: /Title/i}), {
      target: {value: 'new title'},
    });

    await waitFor(() => {
      fireEvent.submit(screen.getByRole('button', {name: /Submit/i}));
      expect(spySetMedia).toHaveBeenCalled();
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });
  });
});
