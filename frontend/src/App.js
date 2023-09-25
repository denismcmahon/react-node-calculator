import './App.css';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <div className='display'>

      </div>
      <div className='buttons'>
        <Button label='C' />
        <Button label='7' />
        <Button label='4' />
        <Button label='1' />
        <Button label='0' />
        <Button label='/' />
        <Button label='8' />
        <Button label='5' />
        <Button label='2' />
        <Button label='.' />
        <Button label='X' />
        <Button label='9' />
        <Button label='6' />
        <Button label='3' />
        <Button label='' />
        <Button label='-' />
        <Button label='+' size='2' />
        <Button label='=' size='2' />
      </div>
    </div>
  );
}

export default App;
