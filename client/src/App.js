import React, { useState, useEffect, useContext, useCallback } from 'react';
import GlobalState from './context/GlobalState';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';
import { StorageAbi } from './abi/ContractAbi';

const web3 = new Web3(Web3.givenProvider);

function App() {
  const [state, setState] = useState({});

  useEffect(() => {
    setState(state => ({...state, web3: new Web3(Web3.givenProvider)}))
  }, [])

  return (
    <GlobalState.Provider value={[state, setState]}>
      <ChildElement/>
    </GlobalState.Provider>
  );
}


function ChildElement() {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState('0x00');
  const [state, setState] = useContext(GlobalState);

  const handleLogin = async () => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await setState(state => ({ ...state, account }))
  }

  const handleContract = async () => {
    const contractAddr = '0x1aAd4fc5772b5e89651A53875D2d99DECEA9538e';
    const contract = new web3.eth.Contract(StorageAbi, contractAddr);
    await setState(state => ({ ...state, contract }));
  }

  const handleSet = async (e) => {
    e.preventDefault();

    const gas = await state.contract.methods.set(number).estimateGas();
    const result = await state.contract.methods.set(number).send({
      from: state.account, gas
    }, (err, result) => {
      console.log(err);
      console.log(result);
    });
  };

  const handleGet = async (e) => {
    e.preventDefault();
    let contract = handleContract();
    const result = await state.contract.methods.get.call();
    setGetNumber(result._hex);
    console.log(result);
  }

  console.log(state);

  // console.log(state);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input type="text" name="name" value={number} onChange={e => setNumber(e.target.value) }  />
          </label>
          <input type="submit" value="Set Number" />
        </form>
        <br/>
        <button onClick={handleGet} type="button">Get Number</button>
        { web3.utils.hexToNumber(getNumber) }
      </header>
    </div>
  );
}

export default App;
