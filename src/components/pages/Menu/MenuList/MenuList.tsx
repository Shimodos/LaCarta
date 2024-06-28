import styles from './MenuList.module.css';
import ProductCart from '../../../ProductCart/ProductCart';
import { MenuListProps } from './MenuList.props';

export function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles['wrapper']}>
      {products.map((product) => (
        <ProductCart
          key={product.id}
          id={product.id}
          title={product.name}
          description={product.ingredients.join(', ')}
          price={product.price}
          rating={product.rating}
          image={product.image}
        />
      ))}
    </div>
  );
}
