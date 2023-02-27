import {render} from '@testing-library/react';
import Library from './Library';
import React from 'react';
import {Media} from '../../interfaces/Media';

describe('Library Component', () => {
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
    userUID: '123',
  };

  it('should not have box when 0 media is pass in props', () => {
    const {getByText, container} = render(<Library medias={[]}></Library>);
    expect(getByText('No Content')).toBeTruthy();
    expect(container.querySelectorAll('.library').length).toEqual(1);
  });

  it('should have one box', () => {
    const {container} = render(<Library medias={[defaultMedia]}></Library>);
    expect(container.querySelectorAll('.box').length).toEqual(1);
  });

  it('should have two boxes, one for each 5 medias pass in props to the library', () => {
    const tenMedias = [
      {...defaultMedia, id: '1'},
      {...defaultMedia, id: '2'},
      {...defaultMedia, id: '3'},
      {...defaultMedia, id: '4'},
      {...defaultMedia, id: '5'},
      {...defaultMedia, id: '6'},
      {...defaultMedia, id: '7'},
      {...defaultMedia, id: '8'},
      {...defaultMedia, id: '9'},
      {...defaultMedia, id: '10'},
    ];

    const {container} = render(<Library medias={tenMedias}></Library>);
    expect(container.querySelectorAll('.box').length).toEqual(2);
  });

  it('should have 3 boxes, one for each 5 medias by type pass in props to the library', () => {
    const tenMedias: Media[] = [
      {...defaultMedia, type: 'videogame', id: '1'},
      {...defaultMedia, id: '2'},
      {...defaultMedia, id: '3'},
      {...defaultMedia, id: '4'},
      {...defaultMedia, id: '5'},
      {...defaultMedia, id: '6'},
      {...defaultMedia, id: '7'},
      {...defaultMedia, id: '8'},
      {...defaultMedia, id: '9'},
      {...defaultMedia, id: '10'},
    ];

    const {container} = render(<Library medias={tenMedias}></Library>);
    expect(container.querySelectorAll('.box').length).toEqual(3);
  });

  it('should have 6 boxes, one for each media type', () => {
    const tenMedias: Media[] = [
      {...defaultMedia, type: 'boardgame', id: '1'},
      {...defaultMedia, type: 'book', id: '2'},
      {...defaultMedia, type: 'comics', id: '3'},
      {...defaultMedia, type: 'manga', id: '4'},
      {...defaultMedia, type: 'videogame', id: '5'},
      {...defaultMedia, type: 'vinyl', id: '6'},
    ];

    const {container} = render(<Library medias={tenMedias}></Library>);
    expect(container.querySelectorAll('.box').length).toEqual(6);
  });
});
