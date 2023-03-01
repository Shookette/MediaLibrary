import React, {FC, useMemo} from 'react';
import {BoxType} from '../../interfaces/Box';
import './Box.scss';
import Item from '../Item/Item';
import {Media} from '../../interfaces/Media';
import ItemFiller from '../ItemFiller/ItemFiller';

type BoxProps = {
  box: BoxType;
  handleOnClick: (media: Media) => void;
  handleOnHover: (media: Media) => void;
};

const Box: FC<BoxProps> = ({box, handleOnClick, handleOnHover}) => {
  const className: string[] = ['box', `box--${box.type}`];

  const fillerRandom = useMemo(() => Math.floor(Math.random() * 7), []);
  return (
    <section className={className.join(' ')}>
      <div className="box_cube">
        <div className="box_cube_face box_cube_face--front">
          {box.medias.map((media, index) => (
            <Item
              media={media}
              index={index}
              key={media.id}
              handleOnClick={handleOnClick}
              handleOnHover={handleOnHover}
            />
          ))}
          {box.medias.length < 5 && <ItemFiller index={fillerRandom} />}
        </div>
        <div className="box_cube_face box_cube_face--back"></div>
        <div className="box_cube_face box_cube_face--right"></div>
        <div className="box_cube_face box_cube_face--left"></div>
        <div className="box_cube_face box_cube_face--top"></div>
        <div className="box_cube_face box_cube_face--bottom"></div>
      </div>
    </section>
  );
};

export default Box;
