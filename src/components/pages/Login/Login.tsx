import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import Headling from '../../Headling/Headling';
import Input from '../../Input/Input';
import styles from './Login.module.css';
import { FormEvent } from 'react';

export function Login(): JSX.Element {
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className={styles['login']} onSubmit={submitHandler}>
      <Headling>Login</Headling>
      <form className={styles['form']}>
        <div className={styles['field']}>
          <label htmlFor="email"> You email</label>
          <Input id="email" type="email" placeholder="email" />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">You password</label>
          <Input id="password" type="password" placeholder="password" />
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
