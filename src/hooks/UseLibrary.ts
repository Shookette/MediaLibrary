import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Media} from '../interfaces/Media';
import {BoxType} from '../interfaces/Box';

const useLibrary = (medias: Media[]) => {
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const [hoverMedia, setHoverMedia] = useState<Media | null>(null);
  const [mediasFiltered, setMediasFiltered] = useState<Media[]>([]);

  const getBoxesArrayByMediasArray = (medias: Media[]): BoxType[] => {
    if (!medias.length) {
      return [];
    }

    const boxes: BoxType[] = [];
    for (let index = 0; index < medias.length; index++) {
      let box: BoxType | undefined = boxes.find(
        (box) => box.type === medias[index].type && box.medias.length < 5
      );

      if (box !== undefined) {
        box.medias.push(medias[index]);
      } else {
        box = {
          type: medias[index].type,
          medias: [medias[index]],
        };
        boxes.push(box);
      }
    }

    return boxes;
  };

  useEffect(() => {
    setBoxes(getBoxesArrayByMediasArray(mediasFiltered));
  }, [mediasFiltered]);

  useEffect(() => {
    if (medias.length) {
      setMediasFiltered(medias);
    }
  }, [medias]);

  const handleOnHover = useCallback((media: Media) => setHoverMedia(media), []);

  const handleOnSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const searchString = event.target.value.toLowerCase();
      setMediasFiltered(medias.filter((media) => media.title.toLowerCase().includes(searchString)));
    },
    [medias]
  );

  return {boxes, hoverMedia, handleOnHover, handleOnSearch};
};

export default useLibrary;
