import React, {FC} from 'react';
import {FormRegister} from '../../interfaces/FormRegister';
import {SubmitHandler, useForm} from 'react-hook-form';

type RegisterForm = {
  handleOnSubmit: SubmitHandler<FormRegister>;
};

const RegisterForm: FC<RegisterForm> = ({handleOnSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormRegister>();

  return (
    <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <label className="form_label" htmlFor="email">
        Email
      </label>
      <input className="form_input" id="email" {...register('email', {required: true})} />
      <span className="form_input--error">{errors.email && 'Email is required'}</span>
      <label className="form_label" htmlFor="username">
        Username
      </label>
      <input className="form_input" id="username" {...register('username', {required: true})} />
      <span className="form_input--error">{errors.username && 'Username is required'}</span>
      <label className="form_label" htmlFor="password">
        Password
      </label>
      <input
        className="form_input"
        id="password"
        type="password"
        {...register('password', {required: true})}
      />
      <span className="form_input--error">{errors.password && 'Password is required'}</span>
      <input className="form_submit" type="submit" />
    </form>
  );
};

export default RegisterForm;