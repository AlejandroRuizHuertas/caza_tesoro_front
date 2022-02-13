import { Button, CardContent, FormControl, Grid, Input, InputLabel } from "@mui/material"

import Typography from '@mui/material/Typography';
import { useParams } from "react-router";
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
import { NOTIFICATION_TYPE, Store } from "react-notifications-component";


export const TreasureCreate = (props: { tesoro: Treasure, i: number, dispatchTesoro: React.Dispatch<any> }): JSX.Element => {
    let { tesoro, i, dispatchTesoro } = props;

    const [fotoSubida, setFotoSubida] = useState<any>();
    const [pista, setPista] = useState<string>("");
    const handlePistaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPista(event.target.value);
    };
    const { postPhoto } = useObtener();


    const onPhotoSelected = (event: any) => {
        
        setFotoSubida(event.target.files[0]);
    }

    const handleCreateTreasure = async () => {
        //Subir foto  
        let mensaje: string = "";
        let tipo: NOTIFICATION_TYPE = "danger";
        if (!fotoSubida) {
            mensaje = "Debes seleccionar una foto antes";
            tipo = "warning";
        }
        if (pista == "") {
            mensaje = "Debes introducir la pista";
            tipo = "warning";
        }
        else {
            const respuesta: any = await postPhoto(fotoSubida);
            const url = respuesta ? respuesta.data.link : "https://1.bp.blogspot.com/-suKiyXUvLUo/UI_zlB8YHDI/AAAAAAAABN4/mhaa83o-Oeg/s320/interrogation.png"
            dispatchTesoro({type: 'update', payload: {i, tesoro: {
                location: props.tesoro.location,
                hint: {
                    image_url: url,
                    text: pista
                },
                found: []

            }}})
            mensaje = "Tesoro añadido.";
            tipo = "success";

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
                    <Grid container direction={'column'}>
                        <Grid container xs={6}>
                            <Grid item container direction={'column'}>
                                <Grid item container xs={12} padding={3} display="flex">
                                    <FormControl fullWidth  >
                                        <InputLabel htmlFor="component-simple">Pista</InputLabel>
                                        <Input id="component-simple" value={pista} onChange={handlePistaChange} />
                                    </FormControl>
                                </Grid>
                                <Grid item >
                                    <Typography variant='h5'>Pista</Typography>
                                    <img src={fotoSubida && URL.createObjectURL(fotoSubida)} style={{ maxWidth: '10em', maxHeight: '10em', outline: '3px solid grey', borderRadius: '5px' }} />

                                </Grid>

                                <Grid item container marginTop={2} direction={'column'}>
                                    <Grid item container direction={'row'} >

                                        <Button variant="outlined" component="label" >
                                            Subir prueba
                                            <input type={'file'} onChange={onPhotoSelected} accept='.png,.jpg,.jpeg' hidden />
                                        </Button>

                                        <Typography variant='h6' style={{ marginLeft: 15 }}>{fotoSubida && fotoSubida.name}</Typography>
                                    </Grid>
                                    <Grid item marginTop={2}>
                                       
                                    <Button variant="contained"  onClick={() => handleCreateTreasure()} style={{marginLeft: 2}}>Crear tesoro</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
};


