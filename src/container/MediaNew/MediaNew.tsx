import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import Media from '../../interfaces/Media';
import './MediaNew.scss';
import {setMedia} from '../../repository/MediaRepository';
import {useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

const MediaNew = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Media>();
  const navigate = useNavigate();
  const options = ['book', 'videogame', 'boardgame'];

  const onSubmit: SubmitHandler<Media> = async (media) => {
    media.id = uuidv4();
    media.lend = false;
    setMedia(media)
      .then(() => navigate('/'))
      .catch((error: unknown) => console.error(error));
  };

  return (
    <article className="add-media">
      <h2 className="add-media_title">Add new media</h2>
      <form className="add-media_form" onSubmit={handleSubmit(onSubmit)}>
        <label className="add-media_label" htmlFor="title">
          Title
        </label>
        <input className="add-media_input" id="title" {...register('title', {required: true})} />
        <span className="add-media_input--error">{errors.title && 'Title is required'}</span>
        <label className="add-media_label" htmlFor="description">
          Description
        </label>
        <textarea className="add-media_input" id="description" {...register('description')} />
        <label className="add-media_label" htmlFor="release">
          Release Date
        </label>
        <input className="add-media_input" id="release" {...register('release')} />
        <label className="add-media_label" htmlFor="image">
          Image URL
        </label>
        <input className="add-media_input" id="image" {...register('image')} />
        <label className="add-media_label" htmlFor="type">
          Media Type
        </label>
        <select className="add-media_input" id="type" {...register('type', {required: true})}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="add-media_input--error">{errors.type && 'Title is required'}</span>
        <input className="add-media_submit" type="submit" />
      </form>
    </article>
  );
};

export default MediaNew;
