import { Link } from 'react-router-dom';
import styles from './ProductCart.module.css';
import { ProductCartProps } from './ProductCart.props';

function ProductCart(props: ProductCartProps) {
  return (
    <Link to="/" className={styles['link']}>
      <div className={styles['cart']}>
        <div className={styles['head']} style={{ backgroundImage: `url('${props.image}')` }}>
          <div className={styles['price']}>
            {props.price}&nbsp;
            <span className={styles['currency']}>€</span>
          </div>
          <button className={styles['add-to-cart']}>
            <img src="/cart-button-icon.svg" alt="Add to cart" />
          </button>
          <div className={styles['rating']}>
            {props.rating}&nbsp;
            <img src="/star-icon.svg" alt="star-icon" />
          </div>
        </div>
        <div className={styles['footer']}>
          <div className={styles['title']}>{props.title}</div>
          <div className={styles['description']}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCart;
