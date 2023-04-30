import {Meta} from '@storybook/react';
import Button from './Button';

export default {
  title: 'Component/Button',
  component: Button,
} as Meta<typeof Button>;

export const Primary = {
  args: {
    children: 'Primary',
    type: 'button',
    displayType: 'primary',
    handleOnClick: () => console.log('click'),
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    type: 'button',
    displayType: 'secondary',
    handleOnClick: () => console.log('click'),
  },
};

export const Tertiary = {
  args: {
    children: 'Tertiary',
    type: 'button',
    displayType: 'tertiary',
    handleOnClick: () => console.log('click'),
  },
};
