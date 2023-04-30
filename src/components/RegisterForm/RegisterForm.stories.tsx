import {Meta} from '@storybook/react';
import {SubmitHandler} from 'react-hook-form';
import RegisterForm from './RegisterForm';
import {FormRegister} from '../../interfaces/FormRegister';

export default {
  title: 'Component/RegisterForm',
  component: RegisterForm,
} as Meta<typeof RegisterForm>;

const onSubmit: SubmitHandler<FormRegister> = (media) => {
  console.log('onSubmit::media::', media);
};

export const New = {
  args: {
    handleOnSubmit: onSubmit,
  },
};
