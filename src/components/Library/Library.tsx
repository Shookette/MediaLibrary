import React, {FC, useEffect, useState} from 'react';
import './Library.scss';
import {Media} from '../../interfaces/Media';
import Box from '../Box/Box';
import {BoxType} from '../../interfaces/Box';
import BoxPreview from '../BoxPreview/BoxPreview';

type LibraryProps = {
  medias: Media[];
  handleOnClick: (media: Media) => void;
};

const Library: FC<LibraryProps> = ({medias, handleOnClick}) => {
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const [hoverMedia, setHoverMedia] = useState<Media | null>(null);
  useEffect(() => {
    if (medias.length) {
      const tempBoxes: BoxType[] = [];
      for (let index = 0; index < medias.length; index++) {
        let box: BoxType | undefined = tempBoxes.find(
          (box) => box.type === medias[index].type && box.medias.length < 5
        );

        if (box !== undefined) {
          box.medias.push(medias[index]);
        } else {
          box = {
            type: medias[index].type,
            medias: [medias[index]],
          };
          tempBoxes.push(box);
        }
      }

      setBoxes(tempBoxes);
    }
  }, [medias]);

  const handleOnHover = (media: Media) => {
    console.log('over::media::', media);
    setHoverMedia(media);
  };

  return (
    <article className="library">
      {boxes.length ? (
        boxes.map((box, index) => (
          <Box box={box} key={index} handleOnClick={handleOnClick} handleOnHover={handleOnHover} />
        ))
      ) : (
        <div className="">No Content</div>
      )}
      <BoxPreview media={hoverMedia} />
    </article>
  );
};

export default Library;
