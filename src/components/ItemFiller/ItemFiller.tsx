import React, {FC} from 'react';
import './ItemFiller.scss';
import Filler0 from '../../assets/filler-0.png';
import Filler1 from '../../assets/filler-1.png';
import Filler2 from '../../assets/filler-2.png';
import Filler3 from '../../assets/filler-3.png';
import Filler4 from '../../assets/filler-4.png';

type ItemFillerProps = {index?: number};

const ItemFiller: FC<ItemFillerProps> = ({index}) => {
  const fillers = [Filler0, Filler1, Filler2, Filler3, Filler4];
  const className = ['item-filler', `item-filler--${index}`];

  return index !== undefined && fillers.at(index) !== undefined ? (
    <img src={fillers[index]} alt="filler" className={className.join(' ')} />
  ) : (
    <></>
  );
};

export default ItemFiller;
