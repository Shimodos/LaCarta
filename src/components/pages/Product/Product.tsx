import { Await, useLoaderData } from 'react-router-dom';
import { Product as ProductType } from '../../../interfaces/product.interfaces';
import { Suspense } from 'react';

export function Product(): JSX.Element {
  const data = useLoaderData() as { data: ProductType };

  return (
    <Suspense fallback={<>Loading...</>}>
      <>
        <Await resolve={data.data}>
          {({ data }: { data: ProductType }) => <>Product - {data.name}</>}
        </Await>
      </>
    </Suspense>
  );
}
