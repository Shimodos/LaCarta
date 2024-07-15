import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { Product } from '../../interfaces/product.interfaces';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_FEES = 10;

export function Cart(): JSX.Element {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();

  const totalPrice = items.reduce((acc, item) => {
    const product = cartProducts.find((product) => product.id === item.id);
    if (!product) {
      return acc;
    }
    return acc + product.price * item.count;
  }, 0);

  const getCart = async (id: number) => {
    const { data } = await axios.get<Product>(`${API}/products/${id}`);
    return data;
  };

  const loadAllProducts = async () => {
    const res = await Promise.all(items.map((item) => getCart(item.id)));
    setCartProducts(res);
  };

  const checkout = async () => {
    await axios.post(
      `${API}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    dispatch(cartActions.clean());
    navigation('/success');
  };

  useEffect(() => {
    loadAllProducts();
  }, [items]);

  return (
    <>
      <Headling className={styles['headling']}>Cart</Headling>
      <div>
        {items.map((item) => {
          const product = cartProducts.find((product) => product.id === item.id);
          if (!product) {
            return null;
          }
          return <CartItem key={item.id} {...product} count={item.count} />;
        })}
      </div>
      <div className={styles['line']}>
        <div className={styles['text']}>Total</div>
        <div className={styles['price']}>
          {totalPrice}&nbsp;<span className={styles['currency']}>€</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>Delivery</div>
        <div className={styles['price']}>
          {DELIVERY_FEES}&nbsp;<span className={styles['currency']}>€</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>
          Total with delivery <span className={styles['items']}>{items.length}</span>
        </div>
        <div className={styles['price']}>
          {totalPrice + DELIVERY_FEES}&nbsp;<span className={styles['currency']}>€</span>
        </div>
      </div>
      <div className={styles['checkout']}>
        <Button appearence="big" onClick={checkout}>
          Checkout
        </Button>
      </div>
    </>
  );
}
