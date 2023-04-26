import React, {FC} from 'react';
import {Media} from '../../interfaces/Media';
import './MediaCard.scss';
import {useIntl} from 'react-intl';

interface MediaCardProps {
  media: Media;
  handleOnClick: () => void;
}

const MediaCard: FC<MediaCardProps> = ({media, handleOnClick}) => {
  const {formatMessage} = useIntl();

  return (
    <article
      onClick={handleOnClick}
      className={`media-card media-card--${media.type} media-card--${media.status}`}>
      {media.image && (
        <img
          className="media-card_image"
          alt={`${formatMessage({id: 'media.cover.alt'})}${media.title}`}
          src={media.image}
        />
      )}
      <h3 className="media-card_title">{media.title}</h3>
    </article>
  );
};

export default MediaCard;
