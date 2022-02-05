import { Routes, Route, Navigate } from 'react-router-dom';
import { Create } from '../components/Create';
import { Game } from '../components/Game';
import { GamesList } from '../components/GamesList';
import { MisJuegos } from '../components/MisJuegos';
import { Navbar } from '../components/Navbar';



export const GameRouter = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    <Route path="games" element={<GamesList />} />
                    <Route path="games/:gameId" element={<Game />} />
                    <Route path="create" element={<Create />} />
                    <Route path="myGames" element={<MisJuegos />} />
                    <Route path="/*" element={<><Navigate to="/games" /></>} />

                </Routes>
            </div>
        </>
    )
}