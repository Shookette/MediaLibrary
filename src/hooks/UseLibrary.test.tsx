import {act, renderHook} from '../test-utils';
import useLibrary from './UseLibrary';
import {Media} from '../interfaces/Media';
import {ChangeEvent} from 'react';

describe('UseLibrary Hook', () => {
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
  it('should have no box and no hoverMedia when no media is passed to the hook', () => {
    const {result} = renderHook(() => useLibrary([]));
    expect(result.current.boxes.length).toEqual(0);
    expect(result.current.hoverMedia).toBeNull();
  });

  it('should return 9 boxes', () => {
    const medias: Media[] = [
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

    const {result} = renderHook(() => useLibrary(medias));
    expect(result.current.boxes.length).toEqual(9);
    expect(result.current.hoverMedia).toBeNull();
  });

  it('should have a hoverMedia when calling handleOnHover function', async () => {
    const medias: Media[] = [{...defaultMedia, type: 'boardgame', id: '1'}];

    const {result} = renderHook(() => useLibrary(medias));
    expect(result.current.boxes.length).toEqual(1);
    expect(result.current.hoverMedia).toBeNull();

    act(() => result.current.handleOnHover(medias[0]));

    expect(result.current.hoverMedia).toEqual(medias[0]);
  });

  it('should return 1 box after a search', () => {
    const medias: Media[] = [
      {...defaultMedia, title: 'search', type: 'boardgame', id: '1'},
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

    const {result} = renderHook(() => useLibrary(medias));
    expect(result.current.boxes.length).toEqual(9);
    expect(result.current.hoverMedia).toBeNull();

    const event = {
      target: {value: 'search'},
    } as ChangeEvent<HTMLInputElement>;

    act(() => result.current.handleOnSearch(event));
    expect(result.current.boxes.length).toEqual(1);
  });
});
