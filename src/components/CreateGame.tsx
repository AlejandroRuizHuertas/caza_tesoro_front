import { height } from "@mui/system";
import { LatLngExpression } from "leaflet";

import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import Login from "./Login";
import TextField from '@mui/material/TextField';

export const Create = (): JSX.Element => {

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
  <div>

      <h1>Crear juego</h1>
      <TextField variant="outlined" label="Nombre"/>
      <br/>
      <TextField variant="outlined" label="Descripción"/>
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
  );
};
