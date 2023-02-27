import React, {useEffect, useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {Media} from '../../interfaces/Media';
import './MediaEdit.scss';
import * as repository from '../../repository/MediaRepository';
import {useNavigate, useParams} from 'react-router-dom';
import MediaForm from '../../components/MediaForm/MediaForm';

const MediaEdit = () => {
  const navigate = useNavigate();
  const [media, setMedia] = useState<Media | null>(null);
  const {mediaId} = useParams();

  useEffect(() => {
    if (mediaId) {
      repository.getMediaByID(mediaId).then((media: Media | null) => setMedia(media));
    }
  }, [mediaId]);

  const onSubmit: SubmitHandler<Media> = async (media) => {
    repository
      .setMedia(media)
      .then(() => navigate('/'))
      .catch((error: unknown) => console.error(error));
  };

  return media ? (
    <article className="media-edit">
      <h2 className="media-edit_title">{media?.title}</h2>
      <MediaForm media={media} handleOnSubmit={onSubmit} />
    </article>
  ) : (
    <article className="media-edit">
      <span className="medit-edit_no-content">No media found</span>
    </article>
  );
};

export default MediaEdit;
