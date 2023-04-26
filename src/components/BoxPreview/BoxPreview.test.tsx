import {Media} from '../../interfaces/Media';
import React from 'react';
import BoxPreview from './BoxPreview';
import {render, screen} from '../../test-utils';

describe('BoxPreview Component', () => {
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

  it('should display the cover of the media when it pass in props', () => {
    render(<BoxPreview media={defaultMedia} />);

    const image: HTMLImageElement = screen.getByRole<HTMLImageElement>('img', {});

    expect(image.src).toEqual(defaultMedia.image);
  });

  it('should display the title of the media', () => {
    const {getByRole} = render(<BoxPreview media={defaultMedia} />);

    expect(getByRole('heading', {name: /Dai Dark/i})).toBeTruthy();
  });

  it('should display the media status owned', () => {
    const {getByRole} = render(<BoxPreview media={defaultMedia} />);
    expect(getByRole('heading', {name: /owned/i})).toBeTruthy();
  });

  it('should not display the media status when media is not pass to props', () => {
    const {queryByRole} = render(<BoxPreview media={null} />);
    expect(queryByRole('heading', {name: /owned/i})).toBeFalsy();
  });
});
