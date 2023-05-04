import React from 'react';
import {SubmitHandler} from 'react-hook-form';
import {Media} from '../../interfaces/Media';
import './MediaNew.scss';
import {setMedia} from '../../repository/MediaRepository';
import {useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import MediaForm from '../../components/MediaForm/MediaForm';
import {useUserContext} from '../../hooks/UserContext';
import {useIntl} from 'react-intl';
import {toast} from 'react-toastify';

const MediaNew = () => {
  const {formatMessage} = useIntl();

  const navigate = useNavigate();
  const {user} = useUserContext();
  const onSubmit: SubmitHandler<Media> = async (media) => {
    media.id = uuidv4();
    media.userUID = user?.uid ?? '';
    setMedia(media)
      .then(() => {
        toast(formatMessage({id: 'media_new_success'}));
        navigate('/');
      })
      .catch((error) => {
        toast(formatMessage({id: 'media_new_error'}, {error: error.messages}));
      });
  };

  return (
    <article className="add-media">
      <h2 className="add-media_title">{formatMessage({id: 'media_new_title'})}</h2>
      <MediaForm handleOnSubmit={onSubmit} />
    </article>
  );
};

export default MediaNew;
