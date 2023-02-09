import React from 'react';
import { SubmitHandler, useForm} from 'react-hook-form';
import Media from '../../interfaces/Media';
import './MediaNewPage.scss';

const options = ['book', 'videogame', 'boardgame'];
const onSubmit: SubmitHandler<Media> = data => console.log(data);

const MediaNewPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Media>();

  return (
    <article className="add-media">
      <h2 className="add-media_title">Add new media</h2>
      <form className="add-media_form" onSubmit={handleSubmit(onSubmit)}>
        <label className="add-media_label" htmlFor="title">Title</label>
        <input className="add-media_input" id="title" {...register("title", { required: true })} />
        <span className="add-media_input--error">{errors.title && "Title is required"}</span>
        <label className="add-media_label" htmlFor="description">Description</label>
        <textarea className="add-media_input" id="description" {...register("description")} />
        <label className="add-media_label" htmlFor="type">Media Type</label>
        <select className="add-media_input" id="type" {...register("type", { required: true })}>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="add-media_input--error">{errors.type && "Title is required"}</span>

        <input className="add-media_submit" type="submit" />
      </form>
    </article>
  );
}

export default MediaNewPage;
