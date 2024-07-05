import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import { API } from '../../helpers/API';
import axios from 'axios';
import { LoginRsponse } from '../../interfaces/auth.interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    console.log(email.value);
    console.log(password.value);
    await sendLoginRequest(email.value, password.value);
  };

  // `${API}/pizza-api-demo/auth/login`

  const sendLoginRequest = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginRsponse>(`${API}/auth/login`, {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem('token', data.access_token);
      dispatch(userActions.addJwt(data.access_token));
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className={styles['login']}>
      <Headling>Login</Headling>
      {error && <div className={styles['error']}>{error}</div>}
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
