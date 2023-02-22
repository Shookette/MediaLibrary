import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {SubmitHandler} from 'react-hook-form';
import RegisterForm from './RegisterForm';
import {FormRegister} from '../../interfaces/FormRegister';

export default {
  title: 'Component/RegisterForm',
  component: RegisterForm,
} as ComponentMeta<typeof RegisterForm>;

const Template: ComponentStory<typeof RegisterForm> = (args) => <RegisterForm {...args} />;

const onSubmit: SubmitHandler<FormRegister> = (media) => {
  console.log('onSubmit::media::', media);
};

export const New = Template.bind({});
New.args = {
  handleOnSubmit: onSubmit,
};
