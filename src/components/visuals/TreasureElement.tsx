import { Button, CardContent } from "@mui/material"

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

export const TreasureElement = (props: { tesoro: Treasure, i: number }): JSX.Element => {
    let { tesoro, i } = props;
    const [foto, setFoto] = useState("");
    const { getPhoto } = useObtener();

    const obtenerFoto = async () => {
        const fotoImgur: any = await getPhoto("0");
        console.log(fotoImgur);
    }
    useMemo(() => {
        obtenerFoto()

    }, []);
    
    return (
        <Box sx={{ minWidth: 275 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Tesoro {i + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Pista: {tesoro.hint.text}
                        {/* //TODO Insertar foto */}
                    </Typography>
                    <Paper variant="outlined">
                        <img src={foto} />
                    </Paper>
                    {/* TODO Subir pista */}
                    <Button variant="outlined">Subir prueba</Button>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
};


