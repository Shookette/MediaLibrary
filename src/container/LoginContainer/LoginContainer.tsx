import React, {useEffect} from 'react';
import {useUserContext} from '../../hooks/UserContext';
import Button from '../../components/Button/Button';
import {SubmitHandler} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {FormLogin} from '../../interfaces/FormLogin';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginContainer.scss';
import {useIntl} from 'react-intl';

const LoginContainer = () => {
  const {login, user} = useUserContext();
  const {formatMessage} = useIntl();

  const navigate = useNavigate();

  const loginWithEmailAndPassword: SubmitHandler<FormLogin> = async (data) => {
    login(data.email, data.password).then(() => {
      navigate('/');
    });
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <article className="login">
      <div className="login_content">
        <h1 className="login_title">{formatMessage({id: 'login_title'})}</h1>
        <LoginForm handleOnSubmit={loginWithEmailAndPassword} />
        <div className="login_actions">
          <Button type="button" displayType="secondary" handleOnClick={() => navigate('/register')}>
            <span>{formatMessage({id: 'register_title'})}</span>
          </Button>
          <Button
            type="button"
            displayType="tertiary"
            handleOnClick={() => navigate('/reset-password')}>
            <span>{formatMessage({id: 'reset_password_title'})}</span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default LoginContainer;
