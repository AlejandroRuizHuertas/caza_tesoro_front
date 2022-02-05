import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Login from './Login';


export const Main = () => {
    return <div>
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
            <Button href="/games" color='primary'>Ir a juegos</Button>
        </header>

    </div>;
};
