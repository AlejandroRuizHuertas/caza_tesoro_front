import { height } from "@mui/system";
import { LatLngExpression } from "leaflet";
import React, { useEffect, useState } from "react";
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMapEvents, Rectangle } from "react-leaflet";
import { useParams } from "react-router";
import { useObtener } from "../hooks/useObtener";
import { Game } from "../interfaces/interfaceGame";
import { Button, Grid } from "@mui/material";
import { Treasure } from "../interfaces/interfaceTreasure";
import { TreasureElement } from "./visuals/TreasureElement";
import { EnumTipo } from "./EnumJuegos";


export const PlayGame = (): JSX.Element => {

  const { gameId } = useParams();

  const { getGameById, getUsername } = useObtener();

  const [coords, setcoords] = useState<number[][]>([[0, 0], [0, 0]])

  const [center, setcenter] = useState<number[]>([])

  const [game, setGame] = useState<Game>();
  const obtenerJuego = async () => {
    const juego: Game = await getGameById(gameId!);

    setcoords([[juego.area.coordinates[0].latitude, juego.area.coordinates[0].longitude], [juego.area.coordinates[2].latitude, juego.area.coordinates[2].longitude]])
    const centerLat = (juego.area.coordinates[0].latitude +  juego.area.coordinates[2].latitude) / 2;
    const centerLong = (juego.area.coordinates[0].longitude +  juego.area.coordinates[2].longitude) / 2;
    setcenter([centerLat, centerLong]);
    setGame(juego);
  }
  useEffect(() => {
    obtenerJuego();
  }, []);

  let data = {
    minLat: -6.1751,
    maxLat: 55.7558,
    minLong: 37.6173,
    maxLong: 139.6917
  };




  var distanceLat = data.maxLat - data.minLat;
  var bufferLat = distanceLat * 0.05;
  var distanceLong = data.maxLong - data.minLong;
  var bufferLong = distanceLong * 0.05;
  const zoom = 11;

  const MyComponent = () => (
    <FeatureGroup>
      {coords &&
        //@ts-ignore
        <Rectangle bounds={coords} pathOptions={{ color: 'yellow' }} />}
    </FeatureGroup>
  );

  return (
    <>


      <h1>Bienvenido a: {game && game.name}</h1>
      <div>

        {center.length != 0 && <MapContainer
          style={{ height: "480px", width: "100%" }}
          zoom={zoom}
          //@ts-ignore
          center={center}
          bounds={[
            [data.minLat - bufferLat, data.minLong - bufferLong],
            [data.maxLat + bufferLat, data.maxLong + bufferLong],
          ]}
          scrollWheelZoom={true}

        >
          <MyComponent />
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        </MapContainer>}
      </div>
      <br />
      <h2>Tesoros</h2>
      {game && game.treasures.map((tesoro: Treasure, index: number) => {
        return (

          <TreasureElement tesoro={tesoro} key={index} i={index} tipo={EnumTipo.PLAY} />

        )
      })}
    </>
  );
};
