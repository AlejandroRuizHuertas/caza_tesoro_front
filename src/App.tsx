import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hola mundoo
        </p>
        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=mbeC2w-uIEU"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pincha para saber el secreto de la vida
        </a>
      <Login />
      </header>
    </div>
  );
}

export default App;
