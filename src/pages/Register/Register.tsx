import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import { RootState } from '../../store/store';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function Register(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerError } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    console.log(email.value);
    console.log(password.value);
    dispatch(register({ email: email.value, password: password.value, name: name.value }));
  };

  // `${API}/pizza-api-demo/auth/login`

  return (
    <div className={styles['register']}>
      <Headling>Register</Headling>
      {registerError && <div className={styles['error']}>{registerError}</div>}
      <form className={styles['form']} onSubmit={submitHandler}>
        <div className={styles['field']}>
          <label htmlFor="email"> You email</label>
          <Input id="email" name="email" type="email" placeholder="email" />
        </div>

        <div className={styles['field']}>
          <label htmlFor="password">You password</label>
          <Input id="password" name="password" type="password" placeholder="password" />
        </div>

        <div className={styles['field']}>
          <label htmlFor="name">You name</label>
          <Input id="name" name="name" type="name" placeholder="name" />
        </div>

        <Button className={styles['button']} appearence="big" type="submit">
          Register
        </Button>
      </form>

      <div className={styles['links']}>
        <div>Do you have an account?</div>
        <Link to="/auth/login">Login</Link>
      </div>
    </div>
  );
}
