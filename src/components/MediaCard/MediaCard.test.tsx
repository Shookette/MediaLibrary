import {screen, render} from '@testing-library/react';
import React from 'react';
import MediaCard from './MediaCard';
import Media from '../../interfaces/Media';

describe('MediaCard Component', () => {
  const defaultMedia: Media = {
    id: '1234',
    title: 'Dai Dark',
    type: 'book',
    lend: false,
    image: 'https://m.media-amazon.com/images/I/81eN2lF9MmL.jpg',
    release: '',
    description: `Necromancy, space action, and dark humor collide in this wildly creative new series from the creator of Dorohedoro!
  Zaha Sanko's body has great and terrible powers--they say that possessing his bones will grant you any wish, even the desire to become ruler of the universe.
  But Sanko is still a teenage dude with his own life, and he isn't about to let every monstrous lowlife in the galaxy rip him limb from limb.
  He and his skeletal buddy Avakian will use their dark powers to fend off any murder attempts while they search space for whomever put this curse on Sanko's bones...because killing them might end the madness.
  (And then Sanko can celebrate with his favorite spaghetti.) Don't miss this hilariously twisted and gruesome new series from the unique mind of Q Hayashida, creator of the manga and Netflix anime Dorohedoro!`,
  };

  it('should have a title', () => {
    render(<MediaCard media={defaultMedia} />);
    expect(screen.getByRole('heading', {name: /Dai Dark/i})).toBeTruthy();
  });

  it('should have a picture', () => {
    render(<MediaCard media={defaultMedia} />);
    const image: HTMLImageElement = screen.getByRole<HTMLImageElement>('img', {});
    expect(image.src).toEqual(defaultMedia.image);
  });

  it('should have a media-card--book classname because of book type', () => {
    const {container} = render(<MediaCard media={defaultMedia} />);
    expect(container.getElementsByClassName(`media-card--${defaultMedia.type}`)).toBeTruthy();
  });

  it('should have a media-card--book classname because of videogame type', () => {
    const media: Media = {...defaultMedia, type: 'videogame'};
    const {container} = render(<MediaCard media={media} />);
    expect(container.getElementsByClassName(`media-card--${defaultMedia.type}`)).toBeTruthy();
  });

  it('should have a media-card--book classname because of boardgame type', () => {
    const media: Media = {...defaultMedia, type: 'boardgame'};
    const {container} = render(<MediaCard media={media} />);
    expect(container.getElementsByClassName(`media-card--${defaultMedia.type}`)).toBeTruthy();
  });

  it('should have a media-card--lend classname because of book type', () => {
    const media: Media = {...defaultMedia, lend: true};
    const {container} = render(<MediaCard media={media} />);
    expect(container.getElementsByClassName('media-card--lend')).toBeTruthy();
  });
});
