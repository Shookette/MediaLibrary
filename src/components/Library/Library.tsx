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

const Library: FC<LibraryProps> = ({medias, handleOnClick}) => {
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const [hoverMedia, setHoverMedia] = useState<Media | null>(null);
  useEffect(() => {
    if (medias.length) {
      setBoxes(getBoxesArrayByMediasArray(medias));
    }
  }, [medias]);

  const handleOnHover = (media: Media) => setHoverMedia(media);

  return (
    <article className="library">
      {boxes.length ? (
        boxes.map((box, index) => {
          let boxPreview = null;
          if (index % 4 === 0 && index !== 0) {
            boxPreview = <BoxPreview media={hoverMedia} key={`boxpreview-${index}`} />;
          }

          return (
            <>
              <Box
                box={box}
                key={index}
                handleOnClick={handleOnClick}
                handleOnHover={handleOnHover}
              />
              {boxPreview}
            </>
          );
        })
      ) : (
        <div className="">No Content</div>
      )}
    </article>
  );
};

export default Library;
