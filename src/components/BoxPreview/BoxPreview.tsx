import React, {FC} from 'react';
import {Media} from '../../interfaces/Media';
import './BoxPreview.scss';
import {useIntl} from 'react-intl';
import BoxStructure from '../BoxStructure/BoxStructure';

type BoxPreviewProps = {
  media: Media | null;
};

const BoxPreview: FC<BoxPreviewProps> = ({media}) => {
  const {formatMessage} = useIntl();

  return (
    <article className="box-preview">
      {media ? (
        <div className="box-preview_content">
          {media?.image && (
            <img
              className="box-preview_content_image"
              alt={`${media.title} cover`}
              src={media.image}
            />
          )}
          <h3 className="box-preview_content_title">{media?.title}</h3>
          {media?.status && (
            <h4 className={`box-preview_content_status box-preview_status--${media?.status}`}>
              <span>{formatMessage({id: media?.status})}</span>
              {media?.lendTo && <span>{media?.lendTo}</span>}
            </h4>
          )}
        </div>
      ) : (
        <BoxStructure />
      )}
    </article>
  );
};

export default BoxPreview;
