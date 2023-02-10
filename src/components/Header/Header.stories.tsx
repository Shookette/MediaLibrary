import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from "./Header";
import {BrowserRouter} from "react-router-dom";

export default {
  title: 'Component/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

export const Default = Template.bind({});
