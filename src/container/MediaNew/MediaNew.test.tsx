import {render, fireEvent, waitFor} from '../../test-utils';
import React from 'react';
import MediaNew from './MediaNew';
import * as MediaRepository from '../../repository/MediaRepository';
import * as messages from '../../translations/fr.json';
import {MockInstance, vi} from 'vitest';
import {Html5Qrcode} from 'html5-qrcode';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');

  return {...actual, useNavigate: () => mockedUsedNavigate};
});

describe('MediaNew Component', () => {
  let spySetMedia: MockInstance;

  beforeEach(() => {
    spySetMedia = vi.spyOn(MediaRepository, 'setMedia').mockReturnValue(Promise.resolve());
    vi.spyOn(Html5Qrcode, 'getCameras').mockReturnValue(Promise.resolve([]));
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
