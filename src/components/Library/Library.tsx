import React, {FC, Fragment} from 'react';
import './Library.scss';
import {Media} from '../../interfaces/Media';
import Box from '../Box/Box';
import BoxPreview from '../BoxPreview/BoxPreview';
import useLibrary from '../../hooks/UseLibrary';
import SearchBar from '../SearchBar/SearchBar';

type LibraryProps = {
  medias: Media[];
  handleOnClick: (media: Media) => void;
};

const Library: FC<LibraryProps> = ({medias, handleOnClick}) => {
  const {boxes, hoverMedia, handleOnHover, handleOnSearch} = useLibrary(medias);

  return (
    <article className="library">
      <div className="library_searchbar" key="library_searchbar">
        <SearchBar handleOnChange={handleOnSearch} />
      </div>

      <div className="library_content" key="library_content">
        {boxes.map((box, index) => {
          let boxPreview = null;
          if (index % 4 === 0 && index !== 0) {
            boxPreview = <BoxPreview media={hoverMedia} key={`boxpreview-${index}`} />;
          }

          return (
            <Fragment key={`${box.type}-${index}`}>
              <Box box={box} handleOnClick={handleOnClick} handleOnHover={handleOnHover} />
              {boxPreview}
            </Fragment>
          );
        })}
      </div>
    </article>
  );
};

export default Library;
