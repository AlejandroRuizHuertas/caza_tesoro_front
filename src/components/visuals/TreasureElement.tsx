import { Button, CardContent, Grid } from "@mui/material"

import Typography from '@mui/material/Typography';
import { useParams } from "react-router";
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Treasure } from "../../interfaces/interfaceTreasure";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useMemo, useState } from "react";
import { useObtener } from "../../hooks/useObtener";
import 'react-notifications-component/dist/theme.css'
import { NOTIFICATION_TYPE, Store } from "react-notifications-component";
import List from '@mui/material/List';

import { EnumTipo } from "../EnumJuegos";
import { getUsuarioSesion } from "../../interfaces/interfaceUser";
import { WinnerDialog } from "./WinnerDialog";

export const TreasureElement = (props: { tesoro: Treasure, i: number, tipo: string }): JSX.Element => {
    let { tesoro, i, tipo } = props;

    const { gameId } = useParams();

    const [fotoSubida, setFotoSubida] = useState<any>();
    const [usuariosFoto, setUsuariosFoto] = useState<string[]>([]);
    const { postPhoto, getUsername, postTreasure } = useObtener();
    const [open, setOpen] = useState<boolean>(false)

    const obtenerUsuariosEncontrados = async () => {
        if (tesoro.found) {
            const usuarios: string[] = [];
            for (const encuentro of tesoro.found) {
                const user: any = await getUsername(encuentro.user_id);
                user && usuarios.push(user)
            }
            setUsuariosFoto(usuarios);
        }
    }
    const onPhotoSelected = (event: any) => {
        setFotoSubida(event.target.files[0]);
    }
    const handleUpload = async () => {
        //Subir foto  

        let mensaje: string = "";
        let tipo: NOTIFICATION_TYPE = "danger";
        if (!fotoSubida) {
            mensaje = "Debes seleccionar una foto antes";
            tipo = "warning";
        }
        else {
            const respuesta: any = await postPhoto(fotoSubida);
            
            const resSubirPrueba: any = await postTreasure({ index: i, proof: respuesta.data.link }, gameId!);
            // const resSubirPrueba: any = await postTreasure({ index: i, proof: 'https://i.imgur.com/R8p6ozx.jpg' }, gameId!);

            //Si la prueba no me devuelve un ganador, es que el juego sigue
            if (resSubirPrueba.winner == "") {
                mensaje = "La prueba ha sido subida. ¡A por más tesoros!";
                tipo = "info";
            } else {
                const idUsuario = getUsuarioSesion()!.username;
                //Si el usuario es el ganador

                if (idUsuario == resSubirPrueba.winner) {
                    mensaje = "¡Enhorabuena! ¡Eres el ganador!";
                    tipo = "success";
                    setOpen(true)
                }
                else {
                    mensaje = "El juego ya ha terminado, y no has resultado ganador. ¡Suerte en la próxima!";
                    tipo = "danger";
                }
            }



        }
        Store.addNotification({
            message: mensaje,
            type: tipo,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
            animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
        })

    }
    useMemo(() => {
        obtenerUsuariosEncontrados();
    }, []);

    return (
        <Box sx={{ minWidth: 275 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5">Tesoro {i + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction={'row'}>
                        <Grid container xs={6}>
                            <Grid item container direction={'column'}>
                                <Grid item>
                                    <Typography variant="h6">
                                        Pista: { tesoro.hint!.text}
                                    </Typography>

                                </Grid>
                                <Grid item >

                                    <img src={tesoro.hint!.image_url} style={{ maxWidth: '10em', maxHeight: '10em', outline: '3px solid grey', borderRadius: '5px' }} />

                                </Grid>
                                {tipo == EnumTipo.PLAY &&
                                    <Grid item container marginTop={2} direction={'column'}>
                                        <Grid item container direction={'row'} >

                                            <Button variant="outlined" component="label" >
                                                Subir prueba
                                                <input type={'file'} onChange={onPhotoSelected} accept='.png,.jpg,.jpeg' hidden />
                                            </Button>

                                            <Typography variant='h6' style={{ marginLeft: 15 }}>{fotoSubida && fotoSubida.name}</Typography>
                                        </Grid>
                                        <Grid item marginTop={2}>


                                            <Button variant="contained" onClick={handleUpload}>Enviar</Button>
                                        </Grid>
                                    </Grid>}
                            </Grid>
                        </Grid>
                        {tipo == EnumTipo.SUPERVISE &&
                            <Grid container xs={6} direction={"column"}>
                                <h3>Encontrado por:</h3>
                                <List>

                                    {usuariosFoto.map(usuario => <p> - {usuario}</p>)}
                                </List>
                            </Grid>}

                    </Grid>
                </AccordionDetails>
            </Accordion>
            <WinnerDialog open={open} handleClose={() => setOpen(false)} />
        </Box>
    )
};


