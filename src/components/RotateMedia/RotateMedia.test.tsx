import {render} from '../../test-utils';
import React from 'react';
import {Media} from '../../interfaces/Media';
import RotateMedia from './RotateMedia';

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

  it('should have a media and show media title, media description, media ', async () => {
    const {getByRole, findByText} = render(<RotateMedia media={defaultMedia} />);

    expect(getByRole('heading', {name: defaultMedia.title})).toBeTruthy();
    expect(getByRole('img', {name: /media image/i})).toBeTruthy();
    expect(findByText(defaultMedia.description || '')).toBeTruthy();
    expect(findByText(defaultMedia.release || '')).toBeTruthy();
  });
});
