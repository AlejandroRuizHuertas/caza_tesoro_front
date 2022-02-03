import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';

import { Main } from './components/Main';
import ProtectedRoute from './components/ProtectedRoute';
import { Games } from './components/Games';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';

function App() {



  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
