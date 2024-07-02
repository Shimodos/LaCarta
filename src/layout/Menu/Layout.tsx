import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

export function Layout(): JSX.Element {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
    window.location.reload();
  };

  return (
    <div className={styles['layout']}>
      <div className={styles['sidebar']}>
        <div className={styles['user']}>
          <img className={styles['avatar']} src="/avatar.png" alt="Avatar" />
          <div className={styles['name']}>John Doe</div>
          <div className={styles['email']}>JohnDoe@gmail.com</div>
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
