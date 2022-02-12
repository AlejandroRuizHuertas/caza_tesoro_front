import { height } from "@mui/system";
import { circleMarker, LatLngExpression, } from "leaflet";
import L from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import Login from "./Login";
import TextField from '@mui/material/TextField';
import "leaflet-draw/dist/leaflet.draw.css";

var leafletDraw = require('leaflet-draw');

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

  function isMarkerInsidePolygon(marker, poly) {
    var inside = false;
    var x = marker.getLatLng().lat, y = marker.getLatLng().lng;
    for (var ii=0;ii<poly.getLatLngs().length;ii++){
        var polyPoints = poly.getLatLngs()[ii];
        for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
            var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
    }

    return inside;
  };  

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        console.log(e);
      },
      locationfound: (location) => {

      },

    })

    var customMarker= L.Icon.extend({
      options: {
          shadowUrl: null,
          iconAnchor: new L.Point(24, 24),
          iconSize: new L.Point(48, 48),
          iconUrl: 'https://cdn.pixabay.com/photo/2014/12/21/23/27/treasure-chest-575386_960_720.png'
      }
  });

    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: {
          circle: false,
          circlemarker: false,
          polygon: false,
          polyline: false,
          marker: {
            icon: new customMarker()
          },
        },
        
    });

    var playableArea,p1,p2,p3,p4;
    var areaLayer;

    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, function(e){
      drawnItems.addLayer(e.layer);
      if (e.layer instanceof L.Rectangle){
        if(!playableArea){
          p1 = "["+e.layer.getLatLngs()[0][0]["lat"]+","+e.layer.getLatLngs()[0][0]["lng"]+"]";
          p2 = "["+e.layer.getLatLngs()[0][1]["lat"]+","+e.layer.getLatLngs()[0][1]["lng"]+"]";
          p3 = "["+e.layer.getLatLngs()[0][2]["lat"]+","+e.layer.getLatLngs()[0][2]["lng"]+"]";
          p4 = "["+e.layer.getLatLngs()[0][3]["lat"]+","+e.layer.getLatLngs()[0][3]["lng"]+"]";
          playableArea = "["+p1+","+p2+","+p3+","+p4+"]";
          areaLayer = e.layer;
        }else{
          e.layer.remove();
        }
      }
      
      if (e.layer instanceof L.Marker){
        if(playableArea){
          if(isMarkerInsidePolygon(e.layer,areaLayer)){
            console.log("YAI");
          }else{
            e.layer.remove();
          }
        }else{
          e.layer.remove();
        }
      }
    
    });

    map.on(L.Draw.Event.DELETED, function(e){
      playableArea = null;
      areaLayer = null;
    });

    //var coords = "[[33.49674296343329, 93.99902343750001],[38.67800554026613, 93.99902343750001],[38.67800554026613, 98.30566406250001],[33.49674296343329, 98.30566406250001]]"
    //var JSONplayableArea = JSON.parse(coords);
    //var polygon = L.polygon(JSONplayableArea, {color: 'red'});
    //polygon.addTo(map);

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
