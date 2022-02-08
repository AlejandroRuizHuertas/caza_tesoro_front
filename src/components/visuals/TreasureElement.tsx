import { Button, CardContent, Grid } from "@mui/material"

import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Treasure } from "../../interfaces/interfaceTreasure";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import { useEffect, useMemo, useState } from "react";
import { useObtener } from "../../hooks/useObtener";
import 'react-notifications-component/dist/theme.css'
import { Store } from "react-notifications-component";
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { EnumTipo } from "../EnumJuegos";

export const TreasureElement = (props: { tesoro: Treasure, i: number, tipo: string }): JSX.Element => {
    let { tesoro, i, tipo } = props;
    const [fotoSubida, setFotoSubida] = useState<any>();
    const [usuariosFoto, setUsuariosFoto] = useState<string[]>([]);
    const { postPhoto, getUsername } = useObtener();


    const obtenerUsuariosEncontrados = async () => {
        if (tesoro.found) {
            const usuarios: string[] = [];
            for (const encuentro of tesoro.found) {
                const user: any = await getUsername(encuentro.user_id);
                user && usuarios.push(user )
            }
            setUsuariosFoto(usuarios);
        }
    }
    const onPhotoSelected = (event: any) => {        
        setFotoSubida(event.target.files[0]);
    }
    const handleUpload = async () => {
        Store.addNotification({
            title: "Wonderful!",
            message: "Configurable",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
            animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
        })
        const respuesta: any = await postPhoto(fotoSubida);
        console.log(respuesta);
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
                                        Pista: {tesoro.hint.text}
                                    </Typography>

                                </Grid>
                                <Grid item >

                                    <img src={"https://i.imgur.com/LncoF4L.jpeg"} style={{ maxWidth: '10em', maxHeight: '10em', outline: '3px solid grey', borderRadius: '5px' }} />

                                </Grid>
                                <Grid item container marginTop={2} direction={'column'}>
                                    <Grid item container direction={'row'} >

                                        <Button variant="outlined" component="label" >
                                            Cargar tesoro
                                            <input type={'file'} onChange={onPhotoSelected} accept='.png,.jpg,.jpeg' hidden />
                                        </Button>

                                        <Typography variant='h6' style={{ marginLeft: 15 }}>{fotoSubida && fotoSubida.name}</Typography>
                                    </Grid>
                                    <Grid item marginTop={2}>

                                        {/* TODO Subir pista */}
                                        <Button variant="contained" onClick={handleUpload}>Enviar</Button>
                                    </Grid>
                                </Grid>
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
        </Box>
    )
};


