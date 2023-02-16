import React, {ChangeEvent, FC} from 'react';
import './SearchBar.scss';

interface SearchBarProp {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProp> = ({handleOnChange}) => {
  return (
    <div className="search-bar">
      <input
        id="search-bar"
        className="search-bar_input"
        type="text"
        placeholder="Search..."
        onChange={handleOnChange}
      />
    </div>
  );
};

export default SearchBar;
