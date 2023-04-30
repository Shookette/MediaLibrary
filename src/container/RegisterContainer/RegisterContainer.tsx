import React, {useEffect} from 'react';
import {useUserContext} from '../../hooks/UserContext';
import Button from '../../components/Button/Button';
import {SubmitHandler} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {FormRegister} from '../../interfaces/FormRegister';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './RegisterContainer.scss';
import {useIntl} from 'react-intl';

const RegisterContainer = () => {
  const {register, user} = useUserContext();
  const {formatMessage} = useIntl();

  const navigate = useNavigate();

  const registerWithEmailAndPassword: SubmitHandler<FormRegister> = async (data) => {
    await register(data.email, data.password, data.username);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <article className="register">
      <div className="register_content">
        <h1 className="register_title">{formatMessage({id: 'register_title'})}</h1>
        <RegisterForm handleOnSubmit={registerWithEmailAndPassword} />
        <div className="register_actions">
          <Button type="button" displayType="secondary" handleOnClick={() => navigate('/login')}>
            <span>{formatMessage({id: 'login_title'})}</span>
          </Button>
          <Button
            type="button"
            displayType="tertiary"
            handleOnClick={() => navigate('/reset-password')}>
            <span>{formatMessage({id: 'reset-password_title'})}</span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default RegisterContainer;
