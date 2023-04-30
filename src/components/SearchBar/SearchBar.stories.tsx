import {ChangeEvent} from 'react';
import {Meta} from '@storybook/react';
import SearchBar from './SearchBar';

export default {
  title: 'Component/SearchBar',
  component: SearchBar,
} as Meta<typeof SearchBar>;

export const Default = {
  args: {
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value),
  },
};
