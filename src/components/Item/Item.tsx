import React, {FC} from 'react';
import {Media} from '../../interfaces/Media';
import './Item.scss';

type ItemProps = {
  media: Media;
  index: number;
  handleOnClick: (media: Media) => void;
  handleOnHover: (media: Media) => void;
};

const Item: FC<ItemProps> = ({media, index, handleOnClick, handleOnHover}) => {
  const className: string[] = ['item', `item--${media.type}`, `item--${media.type}--${index}`];

  return (
    <article
      id={media.id}
      className={className.join(' ')}
      onClick={() => handleOnClick(media)}
      onTouchStart={() => handleOnHover(media)}
      onMouseOver={() => handleOnHover(media)}>
      <h2 className="item_title">{media.title}</h2>
    </article>
  );
};

export default Item;
