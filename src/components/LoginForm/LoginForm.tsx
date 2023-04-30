import React, {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormLogin} from '../../interfaces/FormLogin';
import {useIntl} from 'react-intl';

type LoginForm = {
  handleOnSubmit: SubmitHandler<FormLogin>;
};

const LoginForm: FC<LoginForm> = ({handleOnSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormLogin>();
  const {formatMessage} = useIntl();

  return (
    <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <label className="form_label" htmlFor="email">
        {formatMessage({id: 'account_email'})}
      </label>
      <input className="form_input" id="email" {...register('email', {required: true})} />
      <span role="alert" className="form_input--error">
        {errors.email && formatMessage({id: 'account_email_error'})}
      </span>
      <label className="form_label" htmlFor="password">
        {formatMessage({id: 'account_password'})}
      </label>
      <input
        className="form_input"
        id="password"
        type="password"
        {...register('password', {required: true})}
      />
      <span role="alert" className="form_input--error">
        {errors.password && formatMessage({id: 'account_password_error'})}
      </span>
      <input className="form_submit" type="submit" value={formatMessage({id: 'submit'})} />
    </form>
  );
};

export default LoginForm;
