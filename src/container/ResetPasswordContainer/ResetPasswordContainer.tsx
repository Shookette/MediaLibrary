import {SubmitHandler} from 'react-hook-form';
import {useUserContext} from '../../hooks/UserContext';
import {useIntl} from 'react-intl';
import Button from '../../components/Button/Button';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import {FormResetPassword} from '../../interfaces/FormResetPassword';
import './ResetPasswordContainer.scss';

const ResetPasswordContainer = () => {
  const {resetPassword} = useUserContext();
  const navigate = useNavigate();
  const {formatMessage} = useIntl();

  const resetPasswordWithEmail: SubmitHandler<FormResetPassword> = async (data) => {
    resetPassword(data.email).then(() => {
      navigate('/login');
    });
  };
  return (
    <article className="reset-password">
      <div className="reset-password_content">
        <h1 className="reset-password_title">{formatMessage({id: 'reset-password.title'})}</h1>
        <ResetPasswordForm handleOnSubmit={resetPasswordWithEmail} />
        <div className="reset-password_actions">
          <Button type="button" displayType="secondary" handleOnClick={() => navigate('/login')}>
            <span>{formatMessage({id: 'login.title'})}</span>
          </Button>
          <Button type="button" displayType="tertiary" handleOnClick={() => navigate('/register')}>
            <span>{formatMessage({id: 'register.title'})}</span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ResetPasswordContainer;
