import { MouseEvent, useState } from 'react';
import Button from './components/Button/Button';

function App() {
  const [count, setCount] = useState<number>(0);

  const addCount = (e: MouseEvent) => {
    console.log(e);
    setCount(count + 1);
  };

  return (
    <>
      <Button onClick={addCount}>onClick</Button>
    </>
  );
}

export default App;
