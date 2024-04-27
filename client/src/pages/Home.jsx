import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

function Home() {
    console.log("Welcome Page rendering")
    const navigate = useNavigate();
    const handleClick = (e)=>{
      console.log(e.target.value)
      navigate(`${e.target.value}`)
    }
    const [inputValue, setInputValue] = useState("")
    const [newValue, setNewValue]=useState(0)
    function handleChange(e){
      setInputValue(e.target.value)
    }
    function handleSubmit(e){
      e.preventDefault()
      setNewValue((newValue)=>newValue+inputValue.length)
      setInputValue("")
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to <code>ufs first database attempt</code> beta version.
          </p>
          {/* <form onSubmit={handleSubmit}>
            <input value={inputValue} onChange={handleChange}/>
            <button>Click me</button>
          </form>
          <p>{newValue}</p> */}
          <span><button value='/projects' onClick={handleClick}>See Projects</button> <button value='/newproject' onClick={handleClick}>Add New Project</button></span>
        </header>
        <main>
        </main>
      </div>
    );
}

export default Home
