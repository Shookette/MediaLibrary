import React from 'react';
import {StoryFn, Meta} from '@storybook/react';
import Header from './Header';
import {BrowserRouter} from 'react-router-dom';
import UserProvider from '../../hooks/UserContext';
import WithFirestore from '../WithFirestore';

export default {
  title: 'Component/Header',
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = () => (
  <WithFirestore>
    <UserProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </UserProvider>
  </WithFirestore>
);

export const Default = {
  render: Template,
};
