import React, {useEffect, useState} from 'react';
import {Media} from '../../interfaces/Media';
import {deleteMedia, getMediaByID} from '../../repository/MediaRepository';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../components/Button/Button';
import './MediaDetail.scss';

const MediaDetail = () => {
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
      <div className="media-detail_content">
        <img className="media-detail_image" alt={`${media?.title} cover`} src={media?.image} />
        <p className="media-detail_description">{media?.description}</p>
        <p className="media-detail_status">{media?.status}</p>
      </div>

      <div className="media-detail_actions">
        <Button
          type="button"
          displayType="secondary"
          handleOnClick={deleteMediaAndRedirectToListing}>
          Delete Media
        </Button>
        <Button type="button" displayType="primary" handleOnClick={redirectToUpdateMedia}>
          Update Media
        </Button>
      </div>
    </article>
  );
};

export default MediaDetail;
