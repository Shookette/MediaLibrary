import React from 'react';
import {SubmitHandler} from 'react-hook-form';
import {Media} from '../../interfaces/Media';
import './MediaNew.scss';
import {setMedia} from '../../repository/MediaRepository';
import {useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import MediaForm from '../../components/MediaForm/MediaForm';
import {useUserContext} from '../../hooks/UserContext';

const MediaNew = () => {
  const navigate = useNavigate();
  const {user} = useUserContext();
  const onSubmit: SubmitHandler<Media> = async (media) => {
    media.id = uuidv4();
    media.userUID = user?.uid ?? '';
    setMedia(media)
      .then(() => navigate('/'))
      .catch((error: unknown) => console.error(error));
  };

  return (
    <article className="add-media">
      <h2 className="add-media_title">Add new media</h2>
      <MediaForm handleOnSubmit={onSubmit} />
    </article>
  );
};

export default MediaNew;
