import React, {ChangeEvent, useEffect, useState} from 'react';
import Media from '../../interfaces/Media';
import './MediaListPage.scss';

import MediaCard from '../../components/MediaCard/MediaCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import {getMedias} from '../../repository/MediaRepository';

const MediaListPage = () => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [mediasFiltered, setMediasFiltered] = useState<Media[]>(medias);

  useEffect(() => {
    getMedias().then((medias: Media[]) => setMedias(medias));
  }, []);

  useEffect(() => {
    setMediasFiltered(medias);
  }, [medias]);

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase();
    setMediasFiltered(medias.filter((media) => media.title.toLowerCase().includes(searchString)));
  };

  return (
    <article className="media-list-page">
      <SearchBar handleOnChange={handleOnSearch} />
      <div className="media-list-page_content">
        {mediasFiltered.map((media: Media) => (
          <MediaCard media={media} key={media.id} />
        ))}
      </div>
    </article>
  );
};

export default MediaListPage;
