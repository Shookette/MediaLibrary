import {render} from '../../test-utils';
import Library from './Library';
import React from 'react';
import {Media} from '../../interfaces/Media';

describe('Library Component', () => {
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

  const handleOnClick = () => null;

  it('should not have box when 0 media is pass in props', () => {
    const {container} = render(<Library medias={[]} handleOnClick={handleOnClick}></Library>);
    expect(container.querySelectorAll('.library').length).toEqual(1);
    expect(container.querySelectorAll('.box').length).toEqual(0);
  });

  it('should have one box', () => {
    const {container} = render(
      <Library medias={[defaultMedia]} handleOnClick={handleOnClick}></Library>
    );
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

    const {container} = render(
      <Library medias={tenMedias} handleOnClick={handleOnClick}></Library>
    );
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

    const {container} = render(
      <Library medias={tenMedias} handleOnClick={handleOnClick}></Library>
    );
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

    const {container} = render(
      <Library medias={tenMedias} handleOnClick={handleOnClick}></Library>
    );
    expect(container.querySelectorAll('.box').length).toEqual(6);
  });

  it('should have 1 box preview for 6 boxes', () => {
    const tenMedias: Media[] = [
      {...defaultMedia, type: 'boardgame', id: '1'},
      {...defaultMedia, type: 'book', id: '2'},
      {...defaultMedia, type: 'comics', id: '3'},
      {...defaultMedia, type: 'manga', id: '4'},
      {...defaultMedia, type: 'videogame', id: '5'},
      {...defaultMedia, type: 'vinyl', id: '6'},
    ];

    const {container} = render(
      <Library medias={tenMedias} handleOnClick={handleOnClick}></Library>
    );
    expect(container.querySelectorAll('.box').length).toEqual(6);
    expect(container.querySelectorAll('.box-preview').length).toEqual(1);
  });

  it('should have 2 BoxPreview for 9 boxes (one for 4 boxes)', () => {
    const tenMedias: Media[] = [
      {...defaultMedia, type: 'boardgame', id: '1'},
      {...defaultMedia, type: 'book', id: '2'},
      {...defaultMedia, type: 'comics', id: '3'},
      {...defaultMedia, type: 'manga', id: '4'},
      {...defaultMedia, type: 'videogame', id: '5'},
      {...defaultMedia, type: 'vinyl', id: '6'},
      {...defaultMedia, type: 'vinyl', id: '7'},
      {...defaultMedia, type: 'vinyl', id: '8'},
      {...defaultMedia, type: 'vinyl', id: '9'},
      {...defaultMedia, type: 'vinyl', id: '10'},
      {...defaultMedia, type: 'vinyl', id: '11'},
      {...defaultMedia, type: 'vinyl', id: '12'},
      {...defaultMedia, type: 'vinyl', id: '13'},
      {...defaultMedia, type: 'vinyl', id: '14'},
      {...defaultMedia, type: 'vinyl', id: '15'},
      {...defaultMedia, type: 'vinyl', id: '16'},
      {...defaultMedia, type: 'vinyl', id: '17'},
      {...defaultMedia, type: 'vinyl', id: '18'},
      {...defaultMedia, type: 'vinyl', id: '19'},
      {...defaultMedia, type: 'vinyl', id: '20'},
      {...defaultMedia, type: 'vinyl', id: '21'},
    ];

    const {container} = render(
      <Library medias={tenMedias} handleOnClick={handleOnClick}></Library>
    );
    expect(container.querySelectorAll('.box').length).toEqual(9);
    expect(container.querySelectorAll('.box-preview').length).toEqual(2);
  });
});
