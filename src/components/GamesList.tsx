import { Button } from "@mui/material";

import { Navigate, useNavigate, useParams } from "react-router";


const GamesList = (): JSX.Element => {
    const navigate = useNavigate();
    const handleClickGame = () => {
        navigate('25');
    }

    return (
        <div>
            Lista de juegos
            <Button variant={"outlined"} onClick={handleClickGame}>Ir al juego</Button>
        </div>
    );
};

export { GamesList }
