import { height } from "@mui/system";
import { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Login from "./Login";

export const Games = (): JSX.Element => {
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
  return (
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
      <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
    </MapContainer>
  );
};
