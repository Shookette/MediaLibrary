import {Meta} from '@storybook/react';
import {SubmitHandler} from 'react-hook-form';
import LoginForm from './LoginForm';
import {FormLogin} from '../../interfaces/FormLogin';

export default {
  title: 'Component/LoginForm',
  component: LoginForm,
} as Meta<typeof LoginForm>;

const onSubmit: SubmitHandler<FormLogin> = (media) => {
  console.log('onSubmit::media::', media);
};

export const New = {
  args: {
    handleOnSubmit: onSubmit,
  },
};
