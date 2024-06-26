import { useParams } from 'react-router-dom';
import Headling from '../../Headling/Headling';

export function Product(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Headling>Product - {id}</Headling>
    </>
  );
}
