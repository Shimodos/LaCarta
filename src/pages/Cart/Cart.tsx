import { useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { Product } from '../../interfaces/product.interfaces';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../helpers/API';
import styles from './Cart.module.css';

export function Cart(): JSX.Element {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);

  const getCart = async (id: number) => {
    const { data } = await axios.get<Product>(`${API}/products/${id}`);
    return data;
  };

  const loadAllProducts = async () => {
    const res = await Promise.all(items.map((item) => getCart(item.id)));
    setCartProducts(res);
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
    </>
  );
}
