import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import { RootState } from '../../store/store';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginError } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    console.log(email.value);
    console.log(password.value);
    await sendLoginRequest(email.value, password.value);
  };

  // `${API}/pizza-api-demo/auth/login`

  const sendLoginRequest = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles['login']}>
      <Headling>Login</Headling>
      {loginError && <div className={styles['error']}>{loginError}</div>}
      <form className={styles['form']} onSubmit={submitHandler}>
        <div className={styles['field']}>
          <label htmlFor="email"> You email</label>
          <Input id="email" name="email" type="email" placeholder="email" />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">You password</label>
          <Input id="password" name="password" type="password" placeholder="password" />
        </div>

        <Button className={styles['button']} appearence="big" type="submit">
          Login
        </Button>
      </form>

      <div className={styles['links']}>
        <div>No account?</div>
        <Link to="/auth/register">Register</Link>
        <Link to="#">Forgot your password?</Link>
      </div>
    </div>
  );
}
