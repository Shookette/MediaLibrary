import {render, waitFor, fireEvent} from '../../test-utils';
import React from 'react';
import * as repository from '../../repository/MediaRepository';
import {Media} from '../../interfaces/Media';
import MediaDetail from './MediaDetail';
import {Route, Routes} from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

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

  let spyGetMediaById: jest.SpyInstance;
  let spyDeleteMedia: jest.SpyInstance;

  beforeEach(() => {
    spyGetMediaById = jest
      .spyOn(repository, 'getMediaByID')
      .mockReturnValue(Promise.resolve(defaultMedia));

    spyDeleteMedia = jest.spyOn(repository, 'deleteMedia').mockReturnValue(Promise.resolve());
  });

  it('should have a media and show media title and actions button', async () => {
    const {getByRole} = render(
      <Routes>
        <Route path="/:mediaId" element={<MediaDetail />}></Route>
      </Routes>,
      ['/123']
    );

    await waitFor(() => {
      expect(getByRole('heading', {name: defaultMedia.title})).toBeTruthy();
      expect(getByRole('button', {name: /Delete Media/i})).toBeTruthy();
      expect(getByRole('button', {name: /Update Media/i})).toBeTruthy();
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
      fireEvent.click(getByRole('button', {name: /Delete Media/i}));
      waitFor(() => {
        expect(spyDeleteMedia).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
      });
    });
  });

  it('should redirect to update page when click on Update Media button', async () => {
    const {getByRole} = render(<MediaDetail />);

    await waitFor(async () => {
      fireEvent.click(getByRole('button', {name: /Update Media/i}));
      waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith(`/${defaultMedia.id}/update`);
      });
    });
  });
});
