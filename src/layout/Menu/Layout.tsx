import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

export function Layout(): JSX.Element {
  return (
    <div className={styles['layout']}>
      <div className={styles['sidebar']}>
        <div className={styles['user']}>
          <img className={styles['avatar']} src="/avatar.png" alt="Avatar" />
          <div className={styles['name']}>John Doe</div>
          <div className={styles['email']}>JohnDoe@gmail.com</div>
        </div>
        <div className={styles['menu']}>
          <Link to="/" className={styles['link']}>
            <img src="/menu.svg" alt="Menu Icon" />
            Menu
          </Link>
          <Link to="/cart" className={styles['link']}>
            <img src="/cart.svg" alt="Cart Icon" />
            Cart
          </Link>
        </div>
        <Button className={styles['exit']}>
          <img src="out.svg" alt="Exite Icon" />
          Logout
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
