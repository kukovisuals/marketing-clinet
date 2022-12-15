import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counter-slice';
import './App.css'
import { Main, Profile } from './components'

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(amountAdded(3))
  }
  return (
    <div className="App wrapper">
      <button onClick={handleClick}>{count}</button>
      <Main />
      <Profile />
    </div>
  )
}

export default App
