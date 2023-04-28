import {render, waitFor, fireEvent} from '../../test-utils';
import React from 'react';
import * as repository from '../../repository/MediaRepository';
import {Media} from '../../interfaces/Media';
import MediaList from './MediaList';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('MediaList Component', () => {
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

  let spyGetMedias: jest.SpyInstance;

  beforeEach(() => {
    spyGetMedias = jest
      .spyOn(repository, 'getMedias')
      .mockReturnValue(
        Promise.resolve([defaultMedia, {...defaultMedia, id: '5678', title: 'Dai Dark 2'}])
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have two media showed', async () => {
    const {getAllByText} = render(<MediaList />);

    await waitFor(() => {
      expect(spyGetMedias).toHaveBeenCalled();
      expect(getAllByText(/Dai Dark/i).length).toEqual(2);
    });
  });

  it('should redirect to media detail on click on a media card', async () => {
    const {findByText} = render(<MediaList />);

    await waitFor(async () => {
      fireEvent.click(await findByText('Dai Dark'));
      await waitFor(async () => {
        expect(mockedUsedNavigate).toHaveBeenCalledWith(`/${defaultMedia.id}`);
      });
    });
  });
});
