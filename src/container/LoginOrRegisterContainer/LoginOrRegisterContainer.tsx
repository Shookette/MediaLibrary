import React, {useState} from 'react';
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
  const {login, register} = useUserContext();
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

  return (
    <article className="login">
      <h1 className="login_title">{!isRegisterMode ? 'Login' : 'Register'}</h1>
      <div className="login_content">
        {isRegisterMode ? (
          <RegisterForm handleOnSubmit={registerWithEmailAndPassword} />
        ) : (
          <LoginForm handleOnSubmit={loginWithEmailAndPassword} />
        )}
      </div>
      <div className="login_actions">
        <Button
          type="button"
          displayType="primary"
          handleOnClick={() => setIsRegisterMode(!isRegisterMode)}>
          <span>{isRegisterMode ? 'Login' : 'Register'}</span>
        </Button>
      </div>
    </article>
  );
};

export default LoginOrRegisterContainer;
