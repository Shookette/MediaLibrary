import React, {ChangeEvent, FC} from 'react';
import './SearchBar.scss';
import {useIntl} from 'react-intl';

interface SearchBarProp {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProp> = ({handleOnChange}) => {
  const {formatMessage} = useIntl();

  return (
    <div className="search-bar">
      <input
        id="search-bar"
        className="search-bar_input"
        type="text"
        placeholder={formatMessage({id: 'search_placeholder'})}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default SearchBar;
