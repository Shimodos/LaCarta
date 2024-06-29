import { NavLink, Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export function AuthLayout(): JSX.Element {
  return (
    <div className={styles['layout']}>
      <div className={styles['log']}>
        <img src="/Logo.svg" alt="Logo" />
      </div>

      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}
