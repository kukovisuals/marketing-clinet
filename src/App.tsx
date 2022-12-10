import { useState } from 'react'
import './App.css'
import { Navigation, Main, Footer } from './components'

function App() {

  return (
    <div className="App wrapper">
      <Navigation/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App
