import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import BoxPreview from './BoxPreview';
import {Media} from '../../interfaces/Media';

export default {
  title: 'Component/BoxPreview',
  component: BoxPreview,
} as ComponentMeta<typeof BoxPreview>;

const mediaDefault: Media = {
  id: '1234',
  title: 'Dai Dark',
  type: 'book',
  status: 'owned',
  image: 'https://m.media-amazon.com/images/I/81eN2lF9MmL.jpg',
  release: '',
  lendTo: '',
  description: `Necromancy, space action, and dark humor collide in this wildly creative new series from the creator of Dorohedoro!
  Zaha Sanko's body has great and terrible powers--they say that possessing his bones will grant you any wish, even the desire to become ruler of the universe.
  But Sanko is still a teenage dude with his own life, and he isn't about to let every monstrous lowlife in the galaxy rip him limb from limb.
  He and his skeletal buddy Avakian will use their dark powers to fend off any murder attempts while they search space for whomever put this curse on Sanko's bones...because killing them might end the madness.
  (And then Sanko can celebrate with his favorite spaghetti.) Don't miss this hilariously twisted and gruesome new series from the unique mind of Q Hayashida, creator of the manga and Netflix anime Dorohedoro!`,
  userUID: '123',
};

const Template: ComponentStory<typeof BoxPreview> = (args) => <BoxPreview {...args} />;

export const WithoutMedia = Template.bind({});
WithoutMedia.args = {};

export const WithMedia = Template.bind({});
WithMedia.args = {
  media: mediaDefault,
};
