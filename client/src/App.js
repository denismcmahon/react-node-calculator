import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Display from './components/Display';
import { evaluate, round } from 'mathjs';

function App() {

  const [operations, setOperations] = useState([]);
  const [currentOperation, setCurrentOperation] = useState('');
  const numberValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const calculationValues = ['/', 'X', '-', '+'];

  function setCurrentOperationStatus(buttonLabel) {
    if(numberValues.includes(buttonLabel)) {
      setCurrentOperation('number');
    } else if(calculationValues.includes(buttonLabel)) {
      setCurrentOperation('calculation');
    } else {
      setCurrentOperation('');
    }
  }

  async function performCalculation() {
    let operationsString = operations.join('');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculation: operationsString })
    };

    const response = await fetch('/calculate', requestOptions);
    const calculationData = await response.json();
    let resultArray = [calculationData.result];
    setOperations(resultArray);
  }

  function buttonClick(e) {
    let buttonLabel = e.target.getAttribute('data-label');
    setCurrentOperationStatus(buttonLabel);
    if(buttonLabel === 'X') buttonLabel = '*';
    if(buttonLabel === 'C') {
      setOperations([]);
    } else if(buttonLabel === '=') {
      if(currentOperation === 'number') {
        performCalculation();
      }
    } else {
      if(currentOperation === 'calculation' && calculationValues.includes(buttonLabel)) {
        setOperations(operations => [...operations.slice(0, -1), buttonLabel]);
      } else {
        if(buttonLabel === '.' && operations.includes('.')) {
          // do nothing
        } else {
          setOperations(operations => [...operations, buttonLabel]);
        }
      }
    }
  }

  return (
    <div className="App">
      <Display operations={operations}/>
      <div className='buttons'>
        <Button onClick={buttonClick} label='C' />
        <Button onClick={buttonClick} label='7' />
        <Button onClick={buttonClick} label='4' />
        <Button onClick={buttonClick} label='1' />
        <Button onClick={buttonClick} label='0' />
        <Button onClick={buttonClick} label='/' />
        <Button onClick={buttonClick} label='8' />
        <Button onClick={buttonClick} label='5' />
        <Button onClick={buttonClick} label='2' />
        <Button onClick={buttonClick} label='.' />
        <Button onClick={buttonClick} label='X' />
        <Button onClick={buttonClick} label='9' />
        <Button onClick={buttonClick} label='6' />
        <Button onClick={buttonClick} label='3D' />
        <Button onClick={buttonClick} label='' />
        <Button onClick={buttonClick} label='-' />
        <Button onClick={buttonClick} label='+' size='2' />
        <Button onClick={buttonClick} label='=' size='2' />
      </div>
    </div>
  );
}

export default App;
