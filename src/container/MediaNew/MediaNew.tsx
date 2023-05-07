import React, {useState} from 'react';
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
import QRCodeReader from '../../components/QRCodeReader/QRCodeReader';
import {getMediaBookByISBNAndUserId} from '../../repository/GoogleAPIBookRepository';

const MediaNew = () => {
  const {formatMessage} = useIntl();
  const navigate = useNavigate();
  const {user} = useUserContext();
  const [mediaPreview, setMediaPreview] = useState<Media | undefined>();

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

  const onQRCodeSuccess = async (isbnCode: string) => {
    const media = await getMediaBookByISBNAndUserId(isbnCode, user?.uid);

    if (media?.title === '') {
      toast.error(formatMessage({id: 'scan_book_bar_code_error'}));
      return;
    }

    setMediaPreview(media);
  };

  const onQRCodeError = (error: string) => {
    console.error(formatMessage({id: 'qr_scan_error'}, {error: error}));
  };

  return (
    <article className="add-media">
      <h2 className="add-media_title">{formatMessage({id: 'media_new_title'})}</h2>
      <QRCodeReader
        label={formatMessage({id: 'scan_book_bar_code'})}
        onSuccessCallback={onQRCodeSuccess}
        onErrorCallback={onQRCodeError}
      />
      <MediaForm handleOnSubmit={onSubmit} media={mediaPreview} />
    </article>
  );
};

export default MediaNew;
