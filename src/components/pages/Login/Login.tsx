import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import Headling from '../../Headling/Headling';
import Input from '../../Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import { API } from '../../../helpers/API';
import axios from 'axios';

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
      const { data } = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });
      console.log(data);
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
