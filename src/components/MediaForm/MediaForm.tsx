import React, {FC, useEffect, useState} from 'react';
import {Media} from '../../interfaces/Media';
import {SubmitHandler, useForm} from 'react-hook-form';
import './MediaForm.scss';
import {useIntl} from 'react-intl';
import Media3D from '../Media3D/Media3D';
import {Media3DFace} from '../../interfaces/Media3D';

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
    reset,
  } = useForm<Media>({defaultValues: media});
  const {formatMessage} = useIntl();
  const [data, setData] = useState<Media | undefined>(media);
  const [showFaceClass, setShowFaceClass] = useState<Media3DFace | undefined>(undefined);
  const typeOptions = ['book', 'videogame', 'boardgame', 'vinyl', 'manga', 'comics'];
  const statusOptions = ['owned', 'lend', 'borrowed'];

  useEffect(() => {
    const {unsubscribe} = watch((value) => setData(value as Media));
    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    reset(media);
  }, [media]);

  return (
    <div className="media-form">
      <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <label className="form_label" htmlFor="title">
          {formatMessage({id: 'media_title'})}
        </label>
        <input
          autoFocus
          className="form_input"
          onFocus={() => setShowFaceClass('front')}
          id="title"
          {...register('title', {required: true})}
        />
        <span role="alert" className="form_input--error">
          {errors.title && formatMessage({id: 'media_title_error'})}
        </span>
        <label className="form_label" htmlFor="description">
          {formatMessage({id: 'media_description'})}
        </label>
        <textarea
          onFocus={() => setShowFaceClass('left')}
          className="form_textarea"
          id="description"
          {...register('description')}
        />
        <label className="form_label" htmlFor="release">
          {formatMessage({id: 'media_release'})}
        </label>
        <input
          className="form_input"
          onFocus={() => setShowFaceClass('left')}
          id="release"
          {...register('release')}
        />
        <label className="form_label" htmlFor="image">
          {formatMessage({id: 'media_image_url'})}
        </label>
        <input
          className="form_input"
          id="image"
          {...register('image')}
          onFocus={() => setShowFaceClass('right')}
        />
        <label className="form_label" htmlFor="type">
          {formatMessage({id: 'media_type'})}
        </label>
        <select className="form_input" id="type" {...register('type', {required: true})}>
          {typeOptions.map((typeOption) => (
            <option key={typeOption} value={typeOption}>
              {formatMessage({id: typeOption})}
            </option>
          ))}
        </select>
        <span role="alert" className="form_input--error">
          {errors.type && formatMessage({id: 'media_type_error'})}
        </span>
        <label className="form_label" htmlFor="status">
          {formatMessage({id: 'media_status'})}
        </label>
        <select
          className="form_input"
          onFocus={() => setShowFaceClass('right')}
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
              {formatMessage({id: 'media_lendTo'})}
            </label>
            <input
              className="form_input"
              id="lendTo"
              {...register('lendTo')}
              onFocus={() => setShowFaceClass('right')}
            />
          </>
        )}
        <input className="form_submit" type="submit" value={formatMessage({id: 'submit'})} />
      </form>
      <div className="media-form_object">
        <Media3D media={data as Media} mode="transform" face={showFaceClass} />
      </div>
    </div>
  );
};

export default MediaForm;
