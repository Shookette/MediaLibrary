import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import BoxStructure from './BoxStructure';

export default {
  title: 'Component/BoxStructure',
  component: BoxStructure,
} as ComponentMeta<typeof BoxStructure>;

const Template: ComponentStory<typeof BoxStructure> = (args) => <BoxStructure {...args} />;

export const WithoutChildren = Template.bind({});
WithoutChildren.args = {};
