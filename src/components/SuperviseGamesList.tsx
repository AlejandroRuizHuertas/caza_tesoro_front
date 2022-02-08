import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { Navigate, useNavigate, useParams } from "react-router";
import { useObtener } from "../hooks/useObtener";
import { Game } from "../interfaces/interfaceGame";
import { getUsuarioSesion, User } from "../interfaces/interfaceUser";
import { EnumTipo } from "./EnumJuegos";
import { GameElement } from "./visuals/GameElement";



const SuperviseGamesList = (): JSX.Element => {

    const { getGames } = useObtener();

    const [juegos, setJuegos] = useState<Game[]>([]);



    const obtenerJuegos = async () => {
        const listaJuegos: Game[] = await getGames();
        const usuario: User = getUsuarioSesion() as User;

        setJuegos(listaJuegos.filter((juego) => 
            (juego.organizer_id == usuario._id || usuario.rol == 'admin') 
        ))
    }

    useEffect(() => {
        obtenerJuegos();
    }, []);

    return (
        <div>


            <h2 style={{ marginTop: 10, marginBottom: 10 }}>Todos los juegos</h2>

            <Grid container spacing={2}>
                {juegos.map((game: any, index: number) => {

                    return (
                        <Grid item key={index} xs={3}>
                            <GameElement game={game} tipo={EnumTipo.SUPERVISE} />
                        </Grid>
                    )

                })}
            </Grid>



        </div>
    );
};

export { SuperviseGamesList }
