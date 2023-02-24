import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import Button from './Button';

export default {
  title: 'Component/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  type: 'button',
  displayType: 'primary',
  handleOnClick: () => console.log('click'),
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  type: 'button',
  displayType: 'secondary',
  handleOnClick: () => console.log('click'),
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Tertiary',
  type: 'button',
  displayType: 'tertiary',
  handleOnClick: () => console.log('click'),
};
