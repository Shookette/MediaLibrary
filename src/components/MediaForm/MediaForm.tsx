import React, {FC} from 'react';
import {Media} from '../../interfaces/Media';
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

  const typeOptions = ['book', 'videogame', 'boardgame', 'vinyl', 'manga', 'comics'];
  const statusOptions = ['owned', 'lend', 'borrowed'];

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
      <label className="form_label" htmlFor="status">
        Status
      </label>
      <select className="form_input" id="status" {...register('status', {required: true})}>
        {statusOptions.map((statusOption) => (
          <option key={statusOption} value={statusOption}>
            {statusOption}
          </option>
        ))}
      </select>
      <label className="form_label" htmlFor="type">
        Media Type
      </label>
      <select className="form_input" id="type" {...register('type', {required: true})}>
        {typeOptions.map((typeOption) => (
          <option key={typeOption} value={typeOption}>
            {typeOption}
          </option>
        ))}
      </select>
      <span className="form_input--error">{errors.type && 'Title is required'}</span>
      <input className="form_submit" type="submit" />
    </form>
  );
};

export default MediaForm;
