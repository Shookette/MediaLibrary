import React, {FC, useEffect, useState} from 'react';
import './Library.scss';
import {Media} from '../../interfaces/Media';
import Box from '../Box/Box';
import {BoxType} from '../../interfaces/Box';

type LibraryProps = {
  medias: Media[];
};

const Library: FC<LibraryProps> = ({medias}) => {
  const [boxes, setBoxes] = useState<BoxType[]>([]);
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

  return (
    <article className="library">
      {boxes.length ? (
        boxes.map((box, index) => <Box box={box} key={index} />)
      ) : (
        <div className="">No Content</div>
      )}
    </article>
  );
};

export default Library;
