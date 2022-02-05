import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getUsuarioSesion, logout, User } from '../interfaces/interfaceUser';


export const Navbar = () => {

    const usuario: User = getUsuarioSesion() as User;

    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        navigate('/', {
            replace: true
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <div className="navbar-collapse" >
                <div className="navbar-nav">

                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                        to="/games"
                        style={{width:'10em'}}
                    >
                        Lista de juegos
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                        to="/create"
                        style={{width:'10em'}}
                    >
                        Crear juego
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                        to="/myGames"
                        style={{width:'10em'}}
                    >
                       Mis juegos
                    </NavLink>


                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-info">
                        Hola, {usuario.username}
                    </span>

                    <button
                        className="nav-item nav-link btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}