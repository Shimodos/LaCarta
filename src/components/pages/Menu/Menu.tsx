import Headling from '../../Headling/Headling';
import styles from './Menu.module.css';
import Search from '../../Search/Search';
import ProductCart from '../../ProductCart/ProductCart';
import { API } from '../../../helpers/API.ts';
import { Product } from '../../../interfaces/product.interfaces.ts';
import { useEffect, useState } from 'react';

export function Menu(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  const getMenu = async () => {
    try {
      const res = await fetch(`${API}/products`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${API}/products, received ${res.status}`);
      }
      const data = (await res.json()) as Product[];
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles['head']}>
        <Headling>Menu</Headling>
        <Search placeholder="Enter a dish or composition" />
      </div>
      <div>
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
    </>
  );
}
