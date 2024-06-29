import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { Cart } from './components/pages/Cart/Cart.tsx';
import { Error as ErrorPage } from './components/pages/Error/Erorr.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './components/pages/Product/Product.tsx';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import axios from 'axios';
import { API } from './helpers/API.ts';
import { Login } from './components/pages/Login/Login.tsx';
import { Register } from './components/pages/Register/Register.tsx';

const Menu = lazy(() => import('./components/pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          return defer({
            data: axios
              .get(`${API}/products/${params.id}`)
              .then((data) => data)
              .catch((errorElement) => errorElement),
          });
        },
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
