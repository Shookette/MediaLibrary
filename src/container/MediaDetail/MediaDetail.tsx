import React, {useEffect, useState} from 'react';
import {Media} from '../../interfaces/Media';
import {deleteMedia, getMediaByID} from '../../repository/MediaRepository';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../components/Button/Button';
import './MediaDetail.scss';
import {useIntl} from 'react-intl';
import Media3D from '../../components/Media3D/Media3D';

const MediaDetail = () => {
  const {formatMessage} = useIntl();

  const [media, setMedia] = useState<Media | null>(null);
  const {mediaId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mediaId) {
      getMediaByID(mediaId).then((media: Media | null) => setMedia(media));
    }
  }, [mediaId]);

  const deleteMediaAndRedirectToListing = () => {
    if (media) {
      deleteMedia(media.id).finally(() => navigate('/'));
    }
  };

  const redirectToUpdateMedia = () => {
    if (media) {
      navigate(`/${media.id}/update`);
    }
  };

  return (
    <article className="media-detail">
      <h2 className="media-detail_title">{media?.title}</h2>
      <Media3D media={media ?? ({} as Media)} mode="rotate" />
      <div className="media-detail_content">
        <p className="media-detail_description">{media?.description}</p>
      </div>

      <div className="media-detail_actions">
        <Button
          type="button"
          displayType="secondary"
          handleOnClick={deleteMediaAndRedirectToListing}>
          {formatMessage({id: 'action.media.delete'})}
        </Button>
        <Button type="button" displayType="primary" handleOnClick={redirectToUpdateMedia}>
          {formatMessage({id: 'action.media.update'})}
        </Button>
      </div>
    </article>
  );
};

export default MediaDetail;
