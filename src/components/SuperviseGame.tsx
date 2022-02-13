import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMapEvents, Rectangle } from "react-leaflet";
import { useNavigate, useParams } from "react-router";
import { useObtener } from "../hooks/useObtener";
import { Game } from "../interfaces/interfaceGame";
import { Button, Grid } from "@mui/material";
import { Treasure } from "../interfaces/interfaceTreasure";
import { TreasureElement } from "./visuals/TreasureElement";
import { EnumTipo } from "./EnumJuegos";
import { NOTIFICATION_TYPE, Store } from "react-notifications-component";
import { LatLngExpression } from "leaflet";

const L = require("leaflet");

export const SuperviseGame = (): JSX.Element => {

  const { gameId } = useParams();
  const navigate = useNavigate()
  const { getGameById, getUsername, reiniciarJuego } = useObtener();

  const [game, setGame] = useState<Game>();
  const [ganador, setGanador] = useState<string>();

  const myIcon = L.icon({
    shadowUrl: null,
      iconAnchor: new L.Point(24, 24),
      iconSize: new L.Point(48, 48),
      iconUrl: 'https://cdn.pixabay.com/photo/2014/12/21/23/27/treasure-chest-575386_960_720.png'
});

  

  const obtenerDatos = async () => {
    const juego: any = await getGameById(gameId!);
    setGame(juego);
    setcoords([[juego.area.coordinates[0].latitude,juego.area.coordinates[0].longitude],[juego.area.coordinates[2].latitude,juego.area.coordinates[2].longitude]])
    setGanador(await getUsername(juego.winner));

  }
  const handleClickReinicio = async () => {
    const res: Game = await reiniciarJuego(gameId as string);

    if (res) {
      Store.addNotification({
        message: "La partida se ha reiniciado correctamente",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
        animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
      })
      navigate('/supervise', {
        replace: true
      });
    }
  }
  useEffect(() => {
    obtenerDatos();
  }, []);

  let data = {
    minLat: -6.1751,
    maxLat: 55.7558,
    minLong: 37.6173,
    maxLong: 139.6917
  };

  const centerLat = 36.7196 ;
  var distanceLat = data.maxLat - data.minLat;
  var bufferLat = distanceLat * 0.05;
  const centerLong = -4.42002;
  var distanceLong = data.maxLong - data.minLong;
  var bufferLong = distanceLong * 0.05;
  const zoom = 8;

  const [coords, setcoords] = useState<number[][]>([[0,0],[0,0]])

  const MyComponent = () => (
    <FeatureGroup>
      {coords && 
      //@ts-ignore
      <Rectangle bounds={coords} pathOptions={{ color: 'yellow' }} />}
      
      {game?.treasures.map( tesoro => (
      //@ts-ignore
      <Marker icon={myIcon} position={tesoro.location as LatLngExpression} />))}
    </FeatureGroup>
  );

  return (
    <>


      <h1>Bienvenido a: {game && game.name}</h1>
      {ganador && <h2>Ganador: {ganador}</h2>}
      <div>

        <MapContainer
          style={{ height: "480px", width: "100%" }}
          zoom={zoom}
          center={[centerLat, centerLong]}
          bounds={[
            [data.minLat - bufferLat, data.minLong - bufferLong],
            [data.maxLat + bufferLat, data.maxLong + bufferLong],
          ]}
          scrollWheelZoom={true}

        >
          <MyComponent />
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        </MapContainer>
      </div>
      <br />
      <h2>Tesoros</h2>
      {game && game.treasures.map((tesoro: Treasure, index: number) => {
        return (

          <TreasureElement tesoro={tesoro} key={index} i={index} tipo={EnumTipo.SUPERVISE} />

        )
      })}
      <Button variant="contained" color="error" style={{ marginTop: 5 }} onClick={handleClickReinicio}>Reiniciar juego</Button>
    </>
  );
};
