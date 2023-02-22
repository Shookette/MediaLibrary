import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {SubmitHandler} from 'react-hook-form';
import LoginForm from './LoginForm';
import {FormLogin} from '../../interfaces/FormLogin';

export default {
  title: 'Component/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

const onSubmit: SubmitHandler<FormLogin> = (media) => {
  console.log('onSubmit::media::', media);
};

export const New = Template.bind({});
New.args = {
  handleOnSubmit: onSubmit,
};
