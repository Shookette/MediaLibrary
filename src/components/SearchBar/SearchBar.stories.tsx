import React, {ChangeEvent} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import SearchBar from './SearchBar';

export default {
  title: 'Component/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value),
};
