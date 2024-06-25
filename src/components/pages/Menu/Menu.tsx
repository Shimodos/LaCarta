import Headling from '../../Headling/Headling';
import styles from './Menu.module.css';
import Search from '../../Search/Search';

export function Menu(): JSX.Element {
  return (
    <>
      <div className={styles['head']}>
        <Headling>Menu</Headling>
        <Search placeholder="Enter a dish or composition" />
      </div>
    </>
  );
}
