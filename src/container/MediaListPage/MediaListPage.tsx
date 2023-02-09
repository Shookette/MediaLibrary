import React, {ChangeEvent, useEffect, useState} from 'react';
import Media from '../../interfaces/Media';
import './MediaListPage.scss';

import MediaCard from '../../components/mediaCard/MediaCard';
import SearchBar from '../../components/SearchBar/SearchBar';

const mediasMock: Media[] = [
  {
    title: 'Dai Dark',
    type: 'book',
    lend: false,
    id: 'dai1',
    image:
      'https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782302095601_1_75.jpg',
  },
  {
    title: 'Returnal',
    type: 'videogame',
    lend: false,
    id: 'retur23d',
    image: 'https://m.media-amazon.com/images/I/71iz6ujCosL._AC_SX385_.jpg',
  },
  {
    title: 'Uno',
    type: 'boardgame',
    lend: true,
    id: 'bvds32f',
    image:
      'https://static.fnac-static.com/multimedia/Images/FR/MDM/c9/50/38/3690697/1540-1/tsp20230110180005/Mattel-Jeu-de-cartes-UNO.jpg',
  },
  {
    title: 'Dai Dark',
    type: 'book',
    lend: false,
    id: 'dai1fg',
    image:
      'https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782302095601_1_75.jpg',
  },
  {
    title: 'Returnal',
    type: 'videogame',
    lend: true,
    id: 'retur23dd',
    image: 'https://m.media-amazon.com/images/I/71iz6ujCosL._AC_SX385_.jpg',
  },
  {
    title: 'Uno',
    type: 'boardgame',
    lend: false,
    id: 'bvds32f3',
    image:
      'https://static.fnac-static.com/multimedia/Images/FR/MDM/c9/50/38/3690697/1540-1/tsp20230110180005/Mattel-Jeu-de-cartes-UNO.jpg',
  },
  {
    title: 'Dai Dark',
    type: 'book',
    lend: true,
    id: 'dai12r',
    image:
      'https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782302095601_1_75.jpg',
  },
  {
    title: 'Returnal',
    type: 'videogame',
    lend: false,
    id: 'retur23d89',
    image: 'https://m.media-amazon.com/images/I/71iz6ujCosL._AC_SX385_.jpg',
  },
  {
    title: 'Uno',
    type: 'boardgame',
    lend: false,
    id: 'bvds32fjk',
    image:
      'https://static.fnac-static.com/multimedia/Images/FR/MDM/c9/50/38/3690697/1540-1/tsp20230110180005/Mattel-Jeu-de-cartes-UNO.jpg',
  },
  {
    title: 'Dai Dark',
    type: 'book',
    lend: true,
    id: 'dai1hgfh',
    image:
      'https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782302095601_1_75.jpg',
  },
  {
    title: 'Returnal',
    type: 'videogame',
    lend: false,
    id: 'retur23d786',
    image: 'https://m.media-amazon.com/images/I/71iz6ujCosL._AC_SX385_.jpg',
  },
  {
    title: 'Uno',
    type: 'boardgame',
    lend: true,
    id: 'bvds32fpoi',
    image:
      'https://static.fnac-static.com/multimedia/Images/FR/MDM/c9/50/38/3690697/1540-1/tsp20230110180005/Mattel-Jeu-de-cartes-UNO.jpg',
  },
];

const MediaListPage = () => {
  const [medias, setMedias] = useState<Media[]>(mediasMock);
  const [mediasFiltered, setMediasFiltered] = useState<Media[]>(medias);

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
