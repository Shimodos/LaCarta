import Headling from '../../Headling/Headling';
import styles from './Menu.module.css';
import Search from '../../Search/Search';
import ProductCart from '../../ProductCart/ProductCart';

export function Menu(): JSX.Element {
  return (
    <>
      <div className={styles['head']}>
        <Headling>Menu</Headling>
        <Search placeholder="Enter a dish or composition" />
      </div>
      <div>
        <ProductCart
          id={1}
          title="Pizza Margarita"
          description="Tomato sauce, mozzarella, tomatoes, and basil"
          price={12.99}
          rating={4}
          image="/pizza_1.png"
        />
      </div>
    </>
  );
}
