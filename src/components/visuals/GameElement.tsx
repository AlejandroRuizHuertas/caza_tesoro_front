import { Button, CardContent } from "@mui/material"

import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import React from 'react';
import { useNavigate } from "react-router";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { EnumTipo } from "../EnumJuegos";

export const GameElement = (props: { game: any, tipo:string }): JSX.Element => {
    let { game, tipo } = props;
    
    const navigate = useNavigate();

    const handleClickGame = () => {

        navigate(game._id);
    }
    

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" style={{backgroundColor: game.active ? "#9FE5F9" : "#F2D2BD"}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {game.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Número de tesoros: {game.treasures.length}
                    </Typography>
                    <Typography variant="body2">
                        {game.description}
                    </Typography>
                    
                    {!game.active && tipo == EnumTipo.PLAY && <Typography variant="body2">
                        Ganador: {game.winner}
                    </Typography>}
                </CardContent>
                <CardActions>
                    {(game.active && tipo == EnumTipo.PLAY) && <Button variant={"outlined"} onClick={handleClickGame}>Ir al juego</Button>}
                    {(tipo == EnumTipo.SUPERVISE) && <Button variant={"outlined"} onClick={handleClickGame}>Ir al juego</Button>}
                </CardActions>
            </Card>
        </Box>
    )
};


