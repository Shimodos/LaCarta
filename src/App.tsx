import { MouseEvent, useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

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
    </>
  );
}

export default App;
