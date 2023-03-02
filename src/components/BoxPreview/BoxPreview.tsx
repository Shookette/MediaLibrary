import React, {FC} from 'react';
import {Media} from '../../interfaces/Media';
import './BoxPreview.scss';

type BoxPreviewProps = {
  media: Media | null;
};

const BoxPreview: FC<BoxPreviewProps> = ({media}) => {
  return (
    <article className="box-preview">
      {media?.image && (
        <img className="box-preview_image" alt={`${media.title} cover`} src={media.image} />
      )}
      <h3 className="box-preview_title">{media?.title}</h3>
      {media?.status && (
        <h3 className={`box-preview_status box-preview_status--${media?.status}`}>
          {media?.status}
        </h3>
      )}
    </article>
  );
};

export default BoxPreview;
