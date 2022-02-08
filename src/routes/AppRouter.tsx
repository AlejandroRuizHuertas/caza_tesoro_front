import React from 'react';
import logo from './logo.svg';

import Login from '../components/Login';

import { Main } from '../components/Main';
import '../App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { PrivateRoute } from './PrivateRoute';
import { GameRouter } from './GameRouter';
import { ReactNotifications } from 'react-notifications-component';

function App() {

  return (
    <>
      <ReactNotifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/*" element={
            <PrivateRoute>
              <GameRouter />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
