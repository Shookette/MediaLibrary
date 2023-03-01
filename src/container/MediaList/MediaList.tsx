import React, {ChangeEvent, useEffect, useState} from 'react';
import {Media} from '../../interfaces/Media';
import './MediaList.scss';

import SearchBar from '../../components/SearchBar/SearchBar';
import {getMedias} from '../../repository/MediaRepository';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../../hooks/UserContext';
import Library from '../../components/Library/Library';

const MediaList = () => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [mediasFiltered, setMediasFiltered] = useState<Media[]>(medias);
  const navigate = useNavigate();
  const {user} = useUserContext();

  useEffect(() => {
    getMedias(user?.uid ?? '').then((medias: Media[]) => {
      setMedias(medias);
      setMediasFiltered(medias);
    });
  }, [user]);

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase();
    setMediasFiltered(medias.filter((media) => media.title.toLowerCase().includes(searchString)));
  };

  const handleMediaCardOnClick = (media: Media) => navigate(`/${media.id}`);

  return (
    <article className="media-list-page">
      <SearchBar handleOnChange={handleOnSearch} />
      <div className="media-list-page_content">
        <Library medias={mediasFiltered} handleOnClick={handleMediaCardOnClick} />
      </div>
    </article>
  );
};

export default MediaList;
