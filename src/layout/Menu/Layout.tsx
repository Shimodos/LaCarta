import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions, getProfile } from '../../store/user.slice';
import { useEffect } from 'react';
import { RootState } from '../../store/store';

export function Layout(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.user.profile);

  const logOut = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className={styles['layout']}>
      <div className={styles['sidebar']}>
        <div className={styles['user']}>
          <img className={styles['avatar']} src="/avatar.png" alt="Avatar" />
          <div className={styles['name']}>{profile?.name}</div>
          <div className={styles['email']}>{profile?.email}</div>
        </div>
        <div className={styles['menu']}>
          <NavLink
            to="/"
            className={({ isActive }) => cn(styles['link'], { [styles.active]: isActive })}>
            <img src="/menu.svg" alt="Menu Icon" />
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => cn(styles['link'], { [styles.active]: isActive })}>
            <img src="/cart.svg" alt="Cart Icon" />
            Cart
          </NavLink>
        </div>
        <Button className={styles['exit']} onClick={logOut}>
          <img src="/out.svg" alt="Exite Icon" />
          Logout
        </Button>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}
