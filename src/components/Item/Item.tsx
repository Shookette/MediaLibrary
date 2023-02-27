import React, {FC} from 'react';
import {Media} from '../../interfaces/Media';
import './Item.scss';

type ItemProps = {
  media: Media;
  index: number;
};

const Item: FC<ItemProps> = ({media, index}) => {
  const className: string[] = ['item', `item--${media.type}`, `item--${media.type}--${index}`];

  return (
    <article className={className.join(' ')}>
      <h2 className="item_title">{media.title}</h2>
    </article>
  );
};

export default Item;
