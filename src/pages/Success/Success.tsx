import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

export function Success(): JSX.Element {
  const navigation = useNavigate();

  return (
    <>
      <div className={styles['success']}>
        <img src="/pizza.png" alt="Pizza Image" />
        <div className={styles['text']}>Your order has been successfully completed!</div>
        <Button appearence="big" onClick={() => navigation('/')}>
          Back to Home
        </Button>
      </div>
    </>
  );
}
