import { Button } from "@mui/material";
import { height } from "@mui/system";
import { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Navigate, useNavigate, useParams } from "react-router";
import Login from "./Login";

export const GamesList = (): JSX.Element => {
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
