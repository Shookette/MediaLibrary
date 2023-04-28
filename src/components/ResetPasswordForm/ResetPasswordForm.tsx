import {SubmitHandler, useForm} from 'react-hook-form';
import {FormResetPassword} from '../../interfaces/FormResetPassword';
import React, {FC} from 'react';
import {FormRegister} from '../../interfaces/FormRegister';
import {useIntl} from 'react-intl';

type ResetPasswordForm = {
  handleOnSubmit: SubmitHandler<FormResetPassword>;
};

const ResetPasswordForm: FC<ResetPasswordForm> = ({handleOnSubmit}) => {
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
      <input className="form_submit" type="submit" value={formatMessage({id: 'submit'})} />
    </form>
  );
};

export default ResetPasswordForm;
