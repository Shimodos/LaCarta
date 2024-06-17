import './App.css';
import Button from './components/Button/Button';

function App() {
  return (
    <>
      <Button
        onClick={() => {
          console.log('onClick');
        }}
      >
        {/* {' '} */}
        onClick
      </Button>
    </>
  );
}

export default App;
