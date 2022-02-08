import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Login from './Login';

import MapIcon from '@mui/icons-material/Map';

export const Main = () => {
    return <div>
        <header className="App-header">
            <div style={{ fontSize: 155 }}>

                <MapIcon fontSize='inherit' />
            </div>
            <h1>BÚSQUEDA DEL TESORO</h1>
            <h3>
                Inicie sesión con Google para empezar una aventura
            </h3>

            <Login />

        </header>

    </div>;
};
