import {render, waitFor, fireEvent} from '../../test-utils';
import React from 'react';
import * as repository from '../../repository/MediaRepository';
import {Media} from '../../interfaces/Media';
import MediaDetail from './MediaDetail';
import {Route, Routes} from 'react-router-dom';
import * as messages from '../../translations/fr.json';
import {MockInstance, vi} from 'vitest';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');

  return {...actual, useNavigate: () => mockedUsedNavigate};
});

describe('MediaDetail Component', () => {
  const defaultMedia: Media = {
    id: '1234',
    title: 'Dai Dark',
    type: 'book',
    status: 'owned',
    image: 'https://m.media-amazon.com/images/I/81eN2lF9MmL.jpg',
    release: '',
    description: `Necromancy, space action, and dark humor collide in this wildly creative new series from the creator of Dorohedoro!
Zaha Sanko's body has great and terrible powers--they say that possessing his bones will grant you any wish, even the desire to become ruler of the universe.
But Sanko is still a teenage dude with his own life, and he isn't about to let every monstrous lowlife in the galaxy rip him limb from limb.
He and his skeletal buddy Avakian will use their dark powers to fend off any murder attempts while they search space for whomever put this curse on Sanko's bones...because killing them might end the madness.
(And then Sanko can celebrate with his favorite spaghetti.) Don't miss this hilariously twisted and gruesome new series from the unique mind of Q Hayashida, creator of the manga and Netflix anime Dorohedoro!`,
    userUID: '123',
  };

  let spyGetMediaById: MockInstance;
  let spyDeleteMedia: MockInstance;

  beforeEach(() => {
    spyGetMediaById = vi
      .spyOn(repository, 'getMediaByID')
      .mockReturnValue(Promise.resolve(defaultMedia));

    spyDeleteMedia = vi.spyOn(repository, 'deleteMedia').mockReturnValue(Promise.resolve());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should have a media and show media title and actions button', async () => {
    const {getByRole, getAllByRole} = render(
      <Routes>
        <Route path="/:mediaId" element={<MediaDetail />}></Route>
      </Routes>,
      ['/123']
    );

    await waitFor(() => {
      expect(getAllByRole('heading', {name: defaultMedia.title})).toBeTruthy();
      expect(getAllByRole('heading', {name: defaultMedia.title}).length).toEqual(2);
      expect(getByRole('button', {name: messages['action_media_delete']})).toBeTruthy();
      expect(getByRole('button', {name: messages['action_media_update']})).toBeTruthy();
      expect(spyGetMediaById).toHaveBeenCalled();
    });
  });

  it('should delete media when clicking on delete button', async () => {
    const {getByRole} = render(
      <Routes>
        <Route path="/:mediaId" element={<MediaDetail />}></Route>
      </Routes>,
      ['/123']
    );

    await waitFor(async () => {
      fireEvent.click(getByRole('button', {name: messages['action_media_delete']}));
      waitFor(() => {
        expect(spyDeleteMedia).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
      });
    });
  });

  it('should redirect to update page when click on Update Media button', async () => {
    const {getByRole} = render(<MediaDetail />);

    await waitFor(async () => {
      fireEvent.click(getByRole('button', {name: messages['action_media_update']}));
      waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith(`/${defaultMedia.id}/update`);
      });
    });
  });
});
