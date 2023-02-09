import React, { FC } from 'react';
import Media from '../../interfaces/Media';
import './MediaCard.scss';

interface MediaCardProps {
  media: Media;
}

const MediaCard: FC<MediaCardProps> = ({ media }) => {
  return (
    <article className={`media-card media-card--${media.type} ${media.lend ? 'media-card--shared' : ''}`}>
      <img className="media-card_image" src={media.image} />
      <h3 className="media-card_title">{media.title}</h3>
    </article>
  );
};

export default MediaCard;
