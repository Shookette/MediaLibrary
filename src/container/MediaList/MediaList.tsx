import React, {useEffect, useState} from 'react';
import {Media} from '../../interfaces/Media';
import './MediaList.scss';

import {getMedias} from '../../repository/MediaRepository';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../../hooks/UserContext';
import Library from '../../components/Library/Library';

const MediaList = () => {
  const [medias, setMedias] = useState<Media[]>([]);
  const navigate = useNavigate();
  const {user} = useUserContext();

  useEffect(() => {
    getMedias(user?.uid ?? '').then((medias: Media[]) => {
      setMedias(medias);
    });
  }, [user]);

  const handleMediaCardOnClick = (media: Media) => navigate(`/${media.id}`);

  return (
    <article className="media-list-page">
      <div className="media-list-page_content">
        <Library medias={medias} handleOnClick={handleMediaCardOnClick} />
      </div>
    </article>
  );
};

export default MediaList;
