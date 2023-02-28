import React, {FC} from 'react';
import {BoxType} from '../../interfaces/Box';
import './Box.scss';
import Item from '../Item/Item';
import {Media} from '../../interfaces/Media';

type BoxProps = {
  box: BoxType;
  handleOnClick: (media: Media) => void;
  handleOnHover: (media: Media) => void;
};

const Box: FC<BoxProps> = ({box, handleOnClick, handleOnHover}) => {
  const className: string[] = ['box', `box--${box.type}`];

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
