import React, {FC, useMemo} from 'react';
import {BoxType} from '../../interfaces/Box';
import './Box.scss';
import Item from '../Item/Item';
import {Media} from '../../interfaces/Media';
import ItemFiller from '../ItemFiller/ItemFiller';
import BoxStructure from '../BoxStructure/BoxStructure';

type BoxProps = {
  box: BoxType;
  showFiller?: boolean;
  maxBoxSize?: number;
  handleOnClick: (media: Media) => void;
  handleOnHover: (media: Media) => void;
};

const Box: FC<BoxProps> = ({
  box,
  maxBoxSize = 4,
  handleOnClick,
  handleOnHover,
  showFiller = false,
}) => {
  const fillerRandom = useMemo(() => Math.floor(Math.random() * 5), []);
  return (
    <BoxStructure>
      <div className={`box box--${box.type}`}>
        {box.medias.map((media, index) => (
          <Item
            media={media}
            index={index}
            key={media.id}
            handleOnClick={handleOnClick}
            handleOnHover={handleOnHover}
          />
        ))}
        {box.medias.length < maxBoxSize && showFiller && (
          <ItemFiller key={`filler-${fillerRandom}`} index={fillerRandom} />
        )}
      </div>
    </BoxStructure>
  );
};

export default Box;
