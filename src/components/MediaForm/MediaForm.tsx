import React, {FC} from 'react';
import Media from '../../interfaces/Media';
import {SubmitHandler, useForm} from 'react-hook-form';

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
    <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <label className="form_label" htmlFor="title">
        Title
      </label>
      <input className="form_input" id="title" {...register('title', {required: true})} />
      <span className="form_input--error">{errors.title && 'Title is required'}</span>
      <label className="form_label" htmlFor="description">
        Description
      </label>
      <textarea className="form_textarea" id="description" {...register('description')} />
      <label className="form_label" htmlFor="release">
        Release Date
      </label>
      <input className="form_input" id="release" {...register('release')} />
      <label className="form_label" htmlFor="image">
        Image URL
      </label>
      <input className="form_input" id="image" {...register('image')} />
      <div className="form_inline">
        <label className="form_label" htmlFor="lend">
          Lend
        </label>
        <input className="form_checkbox" type="checkbox" id="lend" {...register('lend')} />
      </div>
      <label className="form_label" htmlFor="type">
        Media Type
      </label>
      <select className="form_input" id="type" {...register('type', {required: true})}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="form_input--error">{errors.type && 'Title is required'}</span>
      <input className="form_submit" type="submit" />
    </form>
  );
};

export default MediaForm;
