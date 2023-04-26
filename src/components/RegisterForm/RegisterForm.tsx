import React, {FC} from 'react';
import {FormRegister} from '../../interfaces/FormRegister';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';

type RegisterForm = {
  handleOnSubmit: SubmitHandler<FormRegister>;
};

const RegisterForm: FC<RegisterForm> = ({handleOnSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormRegister>();
  const {formatMessage} = useIntl();

  return (
    <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <label className="form_label" htmlFor="email">
        {formatMessage({id: 'account.email'})}
      </label>
      <input className="form_input" id="email" {...register('email', {required: true})} />
      <span role="alert" className="form_input--error">
        {errors.email && formatMessage({id: 'account.email.error'})}
      </span>
      <label className="form_label" htmlFor="username">
        {formatMessage({id: 'account.username'})}
      </label>
      <input className="form_input" id="username" {...register('username', {required: true})} />
      <span role="alert" className="form_input--error">
        {errors.username && formatMessage({id: 'account.username.error'})}
      </span>
      <label className="form_label" htmlFor="password">
        {formatMessage({id: 'account.password'})}
      </label>
      <input
        className="form_input"
        id="password"
        type="password"
        {...register('password', {required: true})}
      />
      <span role="alert" className="form_input--error">
        {errors.password && formatMessage({id: 'account.password.error'})}
      </span>
      <input className="form_submit" type="submit" value={formatMessage({id: 'submit'})} />
    </form>
  );
};

export default RegisterForm;
