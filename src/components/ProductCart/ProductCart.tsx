import { Link } from 'react-router-dom';
import styles from './ProductCart.module.css';
import { ProductCartProps } from './ProductCart.props';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

function ProductCart(props: ProductCartProps) {
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.addItem(props.id));
    console.log('Add to cart:', props.id);
  };

  return (
    <Link to={`/product/${props.id}`} className={styles['link']}>
      <div className={styles['cart']}>
        <div className={styles['head']} style={{ backgroundImage: `url('${props.image}')` }}>
          <div className={styles['price']}>
            {props.price}&nbsp;
            <span className={styles['currency']}>€</span>
          </div>
          <button className={styles['add-to-cart']} onClick={add}>
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
