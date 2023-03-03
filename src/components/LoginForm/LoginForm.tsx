import React, {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormLogin} from '../../interfaces/FormLogin';

type LoginForm = {
  handleOnSubmit: SubmitHandler<FormLogin>;
};

const LoginForm: FC<LoginForm> = ({handleOnSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormLogin>();

  return (
    <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <label className="form_label" htmlFor="email">
        Email
      </label>
      <input className="form_input" id="email" {...register('email', {required: true})} />
      <span role="alert" className="form_input--error">
        {errors.email && 'Email is required'}
      </span>
      <label className="form_label" htmlFor="password">
        Password
      </label>
      <input
        className="form_input"
        id="password"
        type="password"
        {...register('password', {required: true})}
      />
      <span role="alert" className="form_input--error">
        {errors.password && 'Password is required'}
      </span>
      <input className="form_submit" type="submit" />
    </form>
  );
};

export default LoginForm;
