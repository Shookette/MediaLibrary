import React, {useEffect, useState} from 'react';
import {useUserContext} from '../../hooks/UserContext';
import Button from '../../components/Button/Button';
import {SubmitHandler} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {FormLogin} from '../../interfaces/FormLogin';
import {FormRegister} from '../../interfaces/FormRegister';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './LoginOrRegisterContainer.scss';

const LoginOrRegisterContainer = () => {
  const {login, register, user} = useUserContext();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();

  const loginWithEmailAndPassword: SubmitHandler<FormLogin> = async (data) => {
    login(data.email, data.password).then(() => {
      navigate('/');
    });
  };

  const registerWithEmailAndPassword: SubmitHandler<FormRegister> = async (data) => {
    register(data.email, data.password, data.username);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <article className="login">
      <div className="login_content">
        <h1 className="login_title">{!isRegisterMode ? 'Login' : 'Register'}</h1>
        {isRegisterMode ? (
          <RegisterForm handleOnSubmit={registerWithEmailAndPassword} />
        ) : (
          <LoginForm handleOnSubmit={loginWithEmailAndPassword} />
        )}
        <div className="login_actions">
          <Button
            type="button"
            displayType="secondary"
            handleOnClick={() => setIsRegisterMode(!isRegisterMode)}>
            <span>{isRegisterMode ? 'Login' : 'Register'}</span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default LoginOrRegisterContainer;
