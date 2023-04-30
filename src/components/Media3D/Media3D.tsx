import {Media} from '../../interfaces/Media';
import React, {FC} from 'react';
import {useIntl} from 'react-intl';
import './Media3D.scss';
import {Media3DFace, Media3DType} from '../../interfaces/Media3D';

type Media3D = {
  media: Media;
  mode?: Media3DType;
  face?: Media3DFace;
};

const Media3D: FC<Media3D> = ({media, mode, face}) => {
  const {formatMessage} = useIntl();
  let media3DClassname = 'media-3d';
  if (mode) {
    media3DClassname += ` media-3d--${mode}`;
  }

  if (face) {
    media3DClassname += ` show-${face}`;
  }

  return (
    <div className={media3DClassname}>
      <div className="media-3d_face media-3d_face--front">
        <h2 className="media-3d_title">{media?.title}</h2>
      </div>
      <div className="media-3d_face media-3d_face--right">
        {media?.image && <img className="media-3d_image" alt="media image" src={media?.image} />}
        <div className="media-3d_status">
          <span>{media?.status && formatMessage({id: media?.status})}</span>
          <span>{media?.lendTo}</span>
        </div>
        {media?.status === 'lend' && <span className="media-3d_lend-to"></span>}
      </div>
      <div className="media-3d_face media-3d_face--left">
        <p className="media-3d_description">{media?.description}</p>
        <span className="media-3d_release">{media?.release}</span>
      </div>
      <div className="media-3d_face media-3d_face--back" />
    </div>
  );
};

export default Media3D;
