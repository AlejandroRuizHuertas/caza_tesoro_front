import { height } from "@mui/system";
import { LatLngExpression } from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useParams } from "react-router";
import { useObtener } from "../hooks/useObtener";
import { Game } from "../interfaces/interfaceGame";
import { Button, Grid } from "@mui/material";
import { Treasure } from "../interfaces/interfaceTreasure";
import { TreasureElement } from "./visuals/TreasureElement";

export const SuperviseGame = (): JSX.Element => {

  const { gameId } = useParams();

  const { getGameById } = useObtener();

  const [game, setGame] = useState<Game>();
  const obtenerJuego = async () => {
    const juego: any = await getGameById(gameId!);
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

  const centerLat = (data.minLat + data.maxLat) / 2;
  var distanceLat = data.maxLat - data.minLat;
  var bufferLat = distanceLat * 0.05;
  const centerLong = (data.minLong + data.maxLong) / 2;
  var distanceLong = data.maxLong - data.minLong;
  var bufferLong = distanceLong * 0.05;
  const zoom = 4;

  const cities = [
    { position: [22.583261, 88.412796], text: "A" },
    { position: [22.58289, 88.41366], text: "B" }
  ];

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        console.log(e);
      },
      locationfound: (location) => {
       
      },
    })
    return null
  }

  return (
    <>


      <h1>Bienvenido a: {game && game.name}</h1>
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
          <MyComponent/>
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        </MapContainer>
      </div>
      <br />
      <h2>Tesoros</h2>
      {game && game.treasures.map((tesoro: Treasure, index: number) => {
        return (
         
            <TreasureElement tesoro={tesoro} key={index} i={index} />
         
        )
      })}
    </>
  );
};
