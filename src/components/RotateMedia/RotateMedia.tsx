import {Media} from '../../interfaces/Media';
import React, {FC} from 'react';
import {useIntl} from 'react-intl';
import './RotateMedia.scss';

type RotateMedia = {
  media: Media;
};

const RotateMedia: FC<RotateMedia> = ({media}) => {
  const {formatMessage} = useIntl();

  return (
    <div className="rotate-media">
      <div className="rotate-media_face rotate-media_face--front">
        <h2 className="rotate-media_title">{media?.title}</h2>
      </div>
      <div className="rotate-media_face rotate-media_face--right">
        {media?.image && (
          <img className="rotate-media_image" alt="media image" src={media?.image} />
        )}
        <div className="rotate-media_status">
          <span>{media?.status && formatMessage({id: media?.status})}</span>
          <span>{media?.lendTo}</span>
        </div>
        {media?.status === 'lend' && <span className="rotate-media_lend-to"></span>}
      </div>
      <div className="rotate-media_face rotate-media_face--left">
        <p className="rotate-media_description">{media?.description}</p>
        <span className="rotate-media_release">{media?.release}</span>
      </div>
      <div className="rotate-media_face rotate-media_face--back" />
    </div>
  );
};

export default RotateMedia;
