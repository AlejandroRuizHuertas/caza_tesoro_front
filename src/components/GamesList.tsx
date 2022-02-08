import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { Navigate, useNavigate, useParams } from "react-router";
import { useObtener } from "../hooks/useObtener";
import { Game } from "../interfaces/interfaceGame";
import { EnumTipo } from "./EnumJuegos";
import { GameElement } from "./visuals/GameElement";



const GamesList = (): JSX.Element => {

    const { getGames, getUsername } = useObtener();

    const [juegosActivos, setJuegosActivos] = useState<Game[]>([]);
    const [juegosInactivos, setJuegosInactivos] = useState<Game[]>([]);


    const obtenerJuegos = async () => 
    {
        const juegos: any = await getGames();
        //Establezco como activos los juegos activos
        setJuegosActivos(juegos.filter((juego: Game) => juego.active));
        //Filtro por juegos inactivos
        let juegosInactivos: Game[] = juegos.filter((juego: Game) => !juego.active);
        let juegosCompletos: Game[] = [];
        //Por cada juego inactivo, obtengo el ganador por el username
        for (const juego of juegosInactivos) {
            const username: string = await getUsername(juego.winner as string);
            juegosCompletos.push({ ...juego, winner: username })
        }
        setJuegosInactivos(juegosCompletos);
    }

    useEffect(() => {
        obtenerJuegos();
    }, []);

    return (
        <div>


            <h2 style={{ marginTop: 10, marginBottom: 10 }}>Juegos activos</h2>

            <Grid container spacing={2}>
                {juegosActivos.map((game: any, index: number) => {

                    return (
                        <Grid item key={index} xs={3}>
                            <GameElement game={game} tipo={EnumTipo.PLAY}/>
                        </Grid>
                    )

                })}
            </Grid>

            <h2 style={{ marginTop: 10, marginBottom: 10 }}>Juegos terminados</h2>
            <Grid container spacing={2}>
                {juegosInactivos.map((game: any, index: number) => {

                    return (
                        <Grid item key={index} xs={3}>
                            <GameElement game={game} tipo={EnumTipo.PLAY}/>
                        </Grid>
                    )

                })}
            </Grid>


        </div>
    );
};

export { GamesList }
