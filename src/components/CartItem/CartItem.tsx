import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { CartItemProps } from './CartItem.props';

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.addItem(props.id));
    console.log('Add to cart:', props.id);
  };

  const decrease = () => {
    dispatch(cartActions.remove(props.id));
    console.log('Remove from cart:', props.id);
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
    console.log('Remove all from cart:', props.id);
  };

  return (
    <div className={styles['item']}>
      <div className={styles['image']} style={{ backgroundImage: `url('${props.image}')` }} />
      <div className={styles['description']}>
        <div className={styles['name']}>{props.name}</div>
        <span className={styles['price']}>{props.price}&nbsp;€</span>
      </div>
      <div className={styles['actions']}>
        <button className={styles['minus']} onClick={decrease}>
          <img src="/minus-icon.svg" alt="Remove to cart" />
        </button>
        <div className={styles['number']}>{props.count}</div>
        <button className={styles['plus']} onClick={increase}>
          <img src="/plus-icon.svg" alt="Add to cart" />
        </button>
        <button className={styles['remove']} onClick={remove}>
          <img src="/delite-icon.svg" alt="Remove all cart" />
        </button>
      </div>

      {/* <div className={styles['rating']}>
        {props.rating}&nbsp;
        <img src="/star-icon.svg" alt="star-icon" />
      </div> */}
    </div>
  );
}

export default CartItem;
