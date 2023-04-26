import {fireEvent, render, waitFor} from '../../test-utils';
import {Media} from '../../interfaces/Media';
import Item from './Item';
import React from 'react';

describe('Item component', () => {
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

  const handleOnClick = jest.fn();
  const handleOnHover = jest.fn();

  it('should display media title and have media type as class', () => {
    const {getByRole, container} = render(
      <Item
        media={defaultMedia}
        key={defaultMedia.id}
        index={1}
        handleOnClick={handleOnClick}
        handleOnHover={handleOnHover}></Item>
    );
    expect(getByRole('heading', {name: defaultMedia.title})).toBeTruthy();
    expect(container.querySelectorAll('.item').length).toEqual(1);
    expect(container.querySelectorAll(`.item--${defaultMedia.type}`).length).toEqual(1);
    expect(container.querySelectorAll(`.item--${defaultMedia.type}--${1}`).length).toEqual(1);
  });

  it('should call the handleOnHover function when hovering the item', async () => {
    const {getByRole} = render(
      <Item
        media={defaultMedia}
        key={defaultMedia.id}
        index={1}
        handleOnClick={handleOnClick}
        handleOnHover={handleOnHover}></Item>
    );

    fireEvent.mouseOver(getByRole('heading', {name: defaultMedia.title}));
    await waitFor(() => expect(handleOnHover).toHaveBeenCalled());
    await waitFor(() => expect(handleOnClick).toHaveBeenCalledTimes(0));
  });

  it('should call the handleOnClick function when hovering the item', async () => {
    const {getByRole} = render(
      <Item
        media={defaultMedia}
        key={defaultMedia.id}
        index={1}
        handleOnClick={handleOnClick}
        handleOnHover={handleOnHover}></Item>
    );

    fireEvent.click(getByRole('heading', {name: defaultMedia.title}));
    await waitFor(() => expect(handleOnClick).toHaveBeenCalled());
  });
});
