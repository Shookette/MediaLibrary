import React, {FC} from 'react';
import {Media} from '../../interfaces/Media';
import './BoxPreview.scss';
import {useIntl} from 'react-intl';

type BoxPreviewProps = {
  media: Media | null;
};

const BoxPreview: FC<BoxPreviewProps> = ({media}) => {
  const {formatMessage} = useIntl();

  return (
    <article className="box-preview">
      {media?.image && (
        <img className="box-preview_image" alt={`${media.title} cover`} src={media.image} />
      )}
      <h3 className="box-preview_title">{media?.title}</h3>
      {media?.status && (
        <h4 className={`box-preview_status box-preview_status--${media?.status}`}>
          <span>{formatMessage({id: media?.status})}</span>
          {media?.lendTo && <span>{media?.lendTo}</span>}
        </h4>
      )}
    </article>
  );
};

export default BoxPreview;
