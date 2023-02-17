import React, {FC} from 'react';
import Media from '../../interfaces/Media';
import {SubmitHandler, useForm} from 'react-hook-form';
import './MediaForm.scss';

type MediaFormProps = {
  media?: Media;
  handleOnSubmit: SubmitHandler<Media>;
};

const MediaForm: FC<MediaFormProps> = ({media, handleOnSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Media>({defaultValues: media});

  const options = ['book', 'videogame', 'boardgame'];

  return (
    <form className="media-form" onSubmit={handleSubmit(handleOnSubmit)}>
      <label className="media-form_label" htmlFor="title">
        Title
      </label>
      <input className="media-form_input" id="title" {...register('title', {required: true})} />
      <span className="media-form_input--error">{errors.title && 'Title is required'}</span>
      <label className="media-form_label" htmlFor="description">
        Description
      </label>
      <textarea className="media-form_textarea" id="description" {...register('description')} />
      <label className="media-form_label" htmlFor="release">
        Release Date
      </label>
      <input className="media-form_input" id="release" {...register('release')} />
      <label className="media-form_label" htmlFor="image">
        Image URL
      </label>
      <input className="media-form_input" id="image" {...register('image')} />
      <div className="media-form_inline">
        <label className="media-form_label" htmlFor="lend">
          Lend
        </label>
        <input className="media-form_checkbox" type="checkbox" id="lend" {...register('lend')} />
      </div>
      <label className="media-form_label" htmlFor="type">
        Media Type
      </label>
      <select className="media-form_input" id="type" {...register('type', {required: true})}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="media-form_input--error">{errors.type && 'Title is required'}</span>
      <input className="media-form_submit" type="submit" />
    </form>
  );
};

export default MediaForm;
