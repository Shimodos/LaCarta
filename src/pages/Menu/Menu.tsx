import Headling from '../../components/Headling/Headling.tsx';
import styles from './Menu.module.css';
import Search from '../../components/Search/Search.tsx';
import { API } from '../../helpers/API.ts';
import { Product } from '../../interfaces/product.interfaces.ts';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList.tsx';

function Menu(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getMenu = async () => {
    try {
      setIsLoading(true);
      //axios
      // await new Promise<void>((resolve) =>
      //   setTimeout(() => {
      //     resolve();
      //   }, 2000),
      // );
      const { data } = await axios.get<Product[]>(`${API}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);

      if (error instanceof AxiosError) {
        setError(error.message);
      }
      setIsLoading(false);
      return;
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
        {error && <div>{error}</div>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <div>Loading...</div>}
      </div>
    </>
  );
}

export default Menu;
