import React, {FC, useEffect, useState} from 'react';
import {Media} from '../../interfaces/Media';
import {SubmitHandler, useForm} from 'react-hook-form';
import './MediaForm.scss';
import {useIntl} from 'react-intl';

type MediaFormProps = {
  media?: Media;
  handleOnSubmit: SubmitHandler<Media>;
};

const MediaForm: FC<MediaFormProps> = ({media, handleOnSubmit}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<Media>({defaultValues: media});
  const {formatMessage} = useIntl();

  const [data, setData] = useState<Media | undefined>(media);
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
          {formatMessage({id: 'media.title'})}
        </label>
        <input
          autoFocus
          className="form_input"
          onFocus={() => setShowFaceClass('show-front')}
          id="title"
          {...register('title', {required: true})}
        />
        <span role="alert" className="form_input--error">
          {errors.title && formatMessage({id: 'media.title.error'})}
        </span>
        <label className="form_label" htmlFor="description">
          {formatMessage({id: 'media.description'})}
        </label>
        <textarea
          onFocus={() => setShowFaceClass('show-left')}
          className="form_textarea"
          id="description"
          {...register('description')}
        />
        <label className="form_label" htmlFor="release">
          {formatMessage({id: 'media.release'})}
        </label>
        <input
          className="form_input"
          onFocus={() => setShowFaceClass('show-left')}
          id="release"
          {...register('release')}
        />
        <label className="form_label" htmlFor="image">
          {formatMessage({id: 'media.image.url'})}
        </label>
        <input
          className="form_input"
          id="image"
          {...register('image')}
          onFocus={() => setShowFaceClass('show-right')}
        />
        <label className="form_label" htmlFor="type">
          {formatMessage({id: 'media.type'})}
        </label>
        <select className="form_input" id="type" {...register('type', {required: true})}>
          {typeOptions.map((typeOption) => (
            <option key={typeOption} value={typeOption}>
              {formatMessage({id: typeOption})}
            </option>
          ))}
        </select>
        <span role="alert" className="form_input--error">
          {errors.type && formatMessage({id: 'media.type.error'})}
        </span>
        <label className="form_label" htmlFor="status">
          {formatMessage({id: 'media.status'})}
        </label>
        <select
          className="form_input"
          onFocus={() => setShowFaceClass('show-right')}
          id="status"
          {...register('status', {required: true, onChange: () => setValue('lendTo', '')})}>
          {statusOptions.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {formatMessage({id: statusOption})}
            </option>
          ))}
        </select>
        {data?.status === 'lend' && (
          <>
            <label className="form_label" htmlFor="lendTo">
              {formatMessage({id: 'media.lendTo'})}
            </label>
            <input
              className="form_input"
              id="lendTo"
              {...register('lendTo')}
              onFocus={() => setShowFaceClass('show-right')}
            />
          </>
        )}
        <input className="form_submit" type="submit" value={formatMessage({id: 'submit'})} />
      </form>
      <div className="media-form_object">
        <div className={`preview ${showFaceClass}`}>
          <div className="preview_face preview_face--front">
            <h2 className="preview_title">{data?.title}</h2>
          </div>
          <div className="preview_face preview_face--right">
            {data?.image && <img className="preview_image" alt="media image" src={data?.image} />}
            <div className="preview_status">
              <span>{data?.status && formatMessage({id: data?.status})}</span>
              <span>{data?.lendTo}</span>
            </div>
            {data?.status === 'lend' && <span className="preview_lend-to"></span>}
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
