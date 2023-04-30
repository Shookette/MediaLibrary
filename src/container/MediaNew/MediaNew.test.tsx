import {render, fireEvent, waitFor} from '../../test-utils';
import React from 'react';
import MediaNew from './MediaNew';
import * as MediaRepository from '../../repository/MediaRepository';
import * as messages from '../../translations/fr.json';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have all input without data', () => {
    const {getByRole} = render(<MediaNew />);

    expect(getByRole('heading', {name: messages['media_new_title']})).toBeTruthy();
  });

  it('should save the media when submitting the form', async () => {
    const {getByRole} = render(<MediaNew />);

    fireEvent.change(getByRole('textbox', {name: messages['media_title']}), {
      target: {value: 'new title'},
    });

    await waitFor(async () => {
      fireEvent.submit(getByRole('button', {name: messages['submit']}));
      await waitFor(async () => {
        expect(spySetMedia).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
      });
    });
  });
});
