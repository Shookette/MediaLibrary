import React, {FC, useEffect, useState} from 'react';
import {Media} from '../../interfaces/Media';
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
    watch,
    formState: {errors},
  } = useForm<Media>({defaultValues: media});

  const [data, setData] = useState<Media | undefined>();
  const [showFaceClass, setShowFaceClass] = useState('');
  const typeOptions = ['book', 'videogame', 'boardgame', 'vinyl', 'manga', 'comics'];
  const statusOptions = ['owned', 'lend', 'borrowed'];

  useEffect(() => {
    const {unsubscribe} = watch((value) => setData(value as Media));
    return () => unsubscribe();
  }, [watch]);

  return (
    <div className="media-form">
      <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <label className="form_label" htmlFor="title">
          Title
        </label>
        <input
          autoFocus
          className="form_input"
          onFocus={() => setShowFaceClass('show-front')}
          id="title"
          {...register('title', {required: true})}
        />
        <span role="alert" className="form_input--error">
          {errors.title && 'Title is required'}
        </span>
        <label className="form_label" htmlFor="description">
          Description
        </label>
        <textarea
          onFocus={() => setShowFaceClass('show-left')}
          className="form_textarea"
          id="description"
          {...register('description')}
        />
        <label className="form_label" htmlFor="release">
          Release Date
        </label>
        <input
          className="form_input"
          onFocus={() => setShowFaceClass('show-left')}
          id="release"
          {...register('release')}
        />
        <label className="form_label" htmlFor="image">
          Image URL
        </label>
        <input
          className="form_input"
          id="image"
          {...register('image')}
          onFocus={() => setShowFaceClass('show-right')}
        />
        <label className="form_label" htmlFor="status">
          Status
        </label>
        <select
          className="form_input"
          onFocus={() => setShowFaceClass('show-right')}
          id="status"
          {...register('status', {required: true})}>
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
        <span role="alert" className="form_input--error">
          {errors.type && 'Title is required'}
        </span>
        <input className="form_submit" type="submit" />
      </form>
      <div className="media-form_object">
        <div className={`preview ${showFaceClass}`}>
          <div className="preview_face preview_face--front">
            <h2 className="preview_title">{data?.title}</h2>
          </div>
          <div className="preview_face preview_face--right">
            <img className="preview_image" alt="media image" src={data?.image} />
            <span className="preview_status">{data?.status}</span>
          </div>
          <div className="preview_face preview_face--left">
            <p className="preview_description">{data?.description}</p>
            <span className="preview_release">{data?.release}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaForm;
