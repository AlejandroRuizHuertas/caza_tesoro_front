import { Routes, Route, Navigate } from 'react-router-dom';
import { Create } from '../components/CreateGame';
import { PlayGame } from '../components/PlayGame';
import { GamesList } from '../components/GamesList';
import { MisJuegos } from '../components/MisJuegos';
import { Navbar } from '../components/Navbar';
import { SuperviseGame } from '../components/SuperviseGame';
import { SuperviseGamesList } from '../components/SuperviseGamesList';



export const GameRouter = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    <Route path="games" element={<GamesList />} />
                    <Route path="games/:gameId" element={<PlayGame />} />
                    <Route path="supervise" element={<SuperviseGamesList />} />
                    <Route path="supervise/:gameId" element={<SuperviseGame />} />
                    <Route path="create" element={<Create />} />
                    <Route path="/*" element={<><Navigate to="/games" /></>} />

                </Routes>
            </div>
        </>
    )
}