import {screen, render, fireEvent, waitFor} from '../../test-utils';
import React from 'react';
import * as messages from '../../translations/fr.json';
import {Media} from '../../interfaces/Media';
import MediaForm from './MediaForm';
import {vi} from 'vitest';

describe('ListForm Component', () => {
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

  const mockHandleOnSubmit = vi.fn();

  it('should have all input without data', () => {
    render(<MediaForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.getByRole('textbox', {name: messages['media_title']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['media_description']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['media_release']})).toBeTruthy();
    expect(screen.getByRole('textbox', {name: messages['media_image_url']})).toBeTruthy();
    expect(screen.getByRole('combobox', {name: messages['media_type']})).toBeTruthy();
    expect(screen.getByRole('combobox', {name: messages['media_status']})).toBeTruthy();
    expect(screen.getByRole('button', {name: messages['submit']})).toBeTruthy();
  });

  it('should have all media type as option', () => {
    render(<MediaForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.getByRole('combobox', {name: messages['media_type']})).toBeTruthy();
    expect(screen.getByRole('option', {name: messages['book']})).toBeTruthy();
    expect(screen.getByRole('option', {name: messages['videogame']})).toBeTruthy();
    expect(screen.getByRole('option', {name: messages['boardgame']})).toBeTruthy();
    expect(screen.getByRole('option', {name: messages['vinyl']})).toBeTruthy();
    expect(screen.getByRole('option', {name: messages['manga']})).toBeTruthy();
    expect(screen.getByRole('option', {name: messages['comics']})).toBeTruthy();
  });

  it('should have all media status as option', () => {
    render(<MediaForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.getByRole('combobox', {name: messages['media_status']})).toBeTruthy();
    expect(screen.getByRole('option', {name: messages['owned']})).toBeTruthy();
    expect(screen.getByRole('option', {name: messages['lend']})).toBeTruthy();
    expect(screen.getByRole('option', {name: messages['borrowed']})).toBeTruthy();
  });

  it('should have all input with data', () => {
    render(<MediaForm media={defaultMedia} handleOnSubmit={mockHandleOnSubmit} />);
    expect(
      (screen.getByRole('textbox', {name: messages['media_title']}) as HTMLInputElement).value
    ).toEqual(defaultMedia.title);

    expect(
      (screen.getByRole('textbox', {name: messages['media_description']}) as HTMLInputElement).value
    ).toEqual(defaultMedia.description);
    expect(
      (screen.getByRole('textbox', {name: messages['media_release']}) as HTMLInputElement).value
    ).toEqual(defaultMedia.release);
    expect(
      (screen.getByRole('textbox', {name: messages['media_image_url']}) as HTMLInputElement).value
    ).toEqual(defaultMedia.image);

    expect(
      (screen.getByRole('combobox', {name: messages['media_status']}) as HTMLInputElement).value
    ).toEqual(defaultMedia.status);

    expect(
      (screen.getByRole('combobox', {name: messages['media_type']}) as HTMLInputElement).value
    ).toEqual(defaultMedia.type);
  });

  it('should not have lendTo input by default', () => {
    render(<MediaForm handleOnSubmit={mockHandleOnSubmit} />);
    expect(screen.queryByRole('textbox', {name: messages['media_lendTo']})).toBeNull();
  });

  it('should have lendTo input when status is set to lend', () => {
    render(<MediaForm handleOnSubmit={mockHandleOnSubmit} />);
    fireEvent.change(screen.getByRole('combobox', {name: messages['media_status']}), {
      target: {value: 'lend'},
    });

    expect(screen.getByRole('textbox', {name: messages['media_lendTo']})).toBeTruthy();
  });

  it('should call onSubmit function when clicking on submit button', async () => {
    render(<MediaForm media={defaultMedia} handleOnSubmit={mockHandleOnSubmit} />);

    fireEvent.change(screen.getByRole('textbox', {name: messages['media_title']}), {
      target: {value: 'new title'},
    });
    fireEvent.submit(screen.getByRole('button', {name: messages['submit']}));

    expect(
      (screen.getByRole('textbox', {name: messages['media_title']}) as HTMLInputElement).value
    ).toEqual('new title');

    await waitFor(() => {
      expect(mockHandleOnSubmit).toHaveBeenCalled();
    });
  });

  it('should remove lendTo parameter when switching the media status', () => {
    render(<MediaForm handleOnSubmit={mockHandleOnSubmit} />);
    fireEvent.change(screen.getByRole('combobox', {name: messages['media_status']}), {
      target: {value: 'lend'},
    });

    expect(screen.getByRole('textbox', {name: messages['media_lendTo']})).toBeTruthy();

    fireEvent.change(screen.getByRole('textbox', {name: messages['media_lendTo']}), {
      target: {value: 'Kuzco'},
    });

    expect(
      (screen.getByRole('textbox', {name: messages['media_lendTo']}) as HTMLInputElement).value
    ).toEqual('Kuzco');

    fireEvent.change(screen.getByRole('combobox', {name: messages['media_status']}), {
      target: {value: 'owned'},
    });

    fireEvent.change(screen.getByRole('combobox', {name: messages['media_status']}), {
      target: {value: 'lend'},
    });

    expect(
      (screen.getByRole('textbox', {name: messages['media_lendTo']}) as HTMLInputElement).value
    ).toEqual('');
  });
});
