import React, {FC, ReactElement} from 'react';
import './BoxStructure.scss';

type BoxStructureProps = {
  children?: ReactElement;
};

const BoxStructure: FC<BoxStructureProps> = ({children}) => {
  return (
    <section className="box-structure">
      <div className="box-structure_cube">
        <div className="box-structure_cube_face box-structure_cube_face--front">{children}</div>
        <div className="box-structure_cube_face box-structure_cube_face--back"></div>
        <div className="box-structure_cube_face box-structure_cube_face--right"></div>
        <div className="box-structure_cube_face box-structure_cube_face--left"></div>
        <div className="box-structure_cube_face box-structure_cube_face--top"></div>
        <div className="box-structure_cube_face box-structure_cube_face--bottom"></div>
      </div>
    </section>
  );
};

export default BoxStructure;
