import { MouseEvent, useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Menu } from './components/pages/Menu/Menu';
import { Cart } from './components/pages/Cart/Cart';
import { Error } from './components/pages/Error/Erorr';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '*',
    element: <Error />,
  },
]);

function App() {
  const [count, setCount] = useState<number>(0);

  const addCount = (e: MouseEvent) => {
    console.log(e);
    setCount(count + 1);
  };

  return (
    <>
      <Button onClick={addCount}>onClick</Button>
      <Button appearence="big" onClick={addCount}>
        onClick
      </Button>
      <Input placeholder="email" />
      <div>
        <a href="/">Menu</a>
        <a href="/cart">Cart</a>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
