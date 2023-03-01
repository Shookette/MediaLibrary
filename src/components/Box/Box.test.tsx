import {render} from '@testing-library/react';
import {BoxType} from '../../interfaces/Box';
import Box from './Box';
import React from 'react';
import {Media} from '../../interfaces/Media';

describe('Box Component', () => {
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
  const handleOnHover = () => null;

  it('should render with box type as class', () => {
    const box: BoxType = {
      type: 'book',
      medias: [],
    };

    const {container} = render(
      <Box box={box} handleOnClick={handleOnClick} handleOnHover={handleOnHover}></Box>
    );
    expect(container.querySelectorAll('.box').length).toEqual(1);
    expect(container.querySelectorAll(`.box--${box.type}`).length).toEqual(1);
  });

  it('should have one item by medias', () => {
    const box: BoxType = {
      type: 'book',
      medias: [
        {...defaultMedia, id: '1'},
        {...defaultMedia, id: '2'},
        {...defaultMedia, id: '3'},
        {...defaultMedia, id: '4'},
        {...defaultMedia, id: '5'},
      ],
    };

    const {container} = render(
      <Box box={box} handleOnClick={handleOnClick} handleOnHover={handleOnHover}></Box>
    );
    expect(container.querySelectorAll('.box').length).toEqual(1);
    expect(container.querySelectorAll('.item').length).toEqual(5);
  });
});
