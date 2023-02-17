import {screen, render, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';
import Media from '../../interfaces/Media';
import MediaForm from './MediaForm';
import {act} from 'react-dom/test-utils';

describe('MediaForm Component', () => {
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

  const mockHandleOnSubmit = jest.fn();

  it('should have all input without data', () => {
    render(<MediaForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.getByRole('textbox', {name: /Title/i})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: /Description/i})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: /Release Date/i})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: /Image URL/i})).toBeTruthy();
    expect(screen.getByRole('combobox', {name: /Media Type/i})).toBeTruthy();
    expect(screen.getByRole('checkbox', {name: /Lend/i})).toBeTruthy();
    expect(screen.getByRole('button', {name: /Submit/i})).toBeTruthy();
  });

  it('should have all media type as option', () => {
    render(<MediaForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.getByRole('combobox', {name: /Media Type/i})).toBeTruthy();
    expect(screen.getByRole('option', {name: /book/i})).toBeTruthy();
    expect(screen.getByRole('option', {name: /videogame/i})).toBeTruthy();
    expect(screen.getByRole('option', {name: /boardgame/i})).toBeTruthy();
  });

  it('should have all input with data', () => {
    render(<MediaForm media={defaultMedia} handleOnSubmit={mockHandleOnSubmit} />);
    expect((screen.getByRole('textbox', {name: /Title/i}) as HTMLInputElement).value).toEqual(
      defaultMedia.title
    );

    expect((screen.getByRole('textbox', {name: /Description/i}) as HTMLInputElement).value).toEqual(
      defaultMedia.description
    );
    expect(
      (screen.getByRole('textbox', {name: /Release Date/i}) as HTMLInputElement).value
    ).toEqual(defaultMedia.release);
    expect((screen.getByRole('textbox', {name: /Image URL/i}) as HTMLInputElement).value).toEqual(
      defaultMedia.image
    );
    expect((screen.getByRole('combobox', {name: /Media Type/i}) as HTMLInputElement).value).toEqual(
      defaultMedia.type
    );
  });

  it('should call onSubmit function when clicking on submit button', async () => {
    render(<MediaForm media={defaultMedia} handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.change(screen.getByRole('textbox', {name: /Title/i}), {
      target: {value: 'new title'},
    });
    fireEvent.submit(screen.getByRole('button', {name: /Submit/i}));

    expect((screen.getByRole('textbox', {name: /Title/i}) as HTMLInputElement).value).toEqual(
      'new title'
    );

    await waitFor(() => {
      expect(mockHandleOnSubmit).toHaveBeenCalled();
    });
  });
});
