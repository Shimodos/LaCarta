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
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getMenu(search);
  }, [search]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      //axios
      // await new Promise<void>((resolve) =>
      //   setTimeout(() => {
      //     resolve();
      //   }, 2000),
      // );
      const { data } = await axios.get<Product[]>(`${API}/products`, {
        params: {
          name,
        },
      });
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div className={styles['head']}>
        <Headling>Menu</Headling>
        <Search placeholder="Enter a dish or composition" onChange={handleSearch} />
      </div>
      <div>
        {error && <div>{error}</div>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <div>Loading...</div>}
        {!isLoading && products.length === 0 && <div>No products found</div>}
      </div>
    </>
  );
}

export default Menu;
