import { circleMarker, LatLngExpression, } from "leaflet";
import L from "leaflet";
import React, { useReducer } from "react";
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { NOTIFICATION_TYPE, Store } from "react-notifications-component";

import { useState } from "react";
import { Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { Treasure } from "../interfaces/interfaceTreasure";
import { TreasureCreate } from "./visuals/TreasureCreate";
import { useNavigate } from "react-router";
import { useObtener } from "../hooks/useObtener";



export const Create = (): JSX.Element => {

  const [nombre, setNombre] = useState<string>("")
  const [descripcion, setDescripcion] = useState<string>("");

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescripcion(event.target.value);
  };

  const [playArea, setPlayArea] = useState<string>("");


  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        return [...state, action.payload];
      case 'update':
        state[action.payload.i] = action.payload.tesoro
        return state

    }
  }
  const navigate = useNavigate()
  const initialState = [];
  const [tesoros, dispatch] = useReducer(reducer, initialState);

  const centerLat = 36.7049697339655;
  const centerLong = -4.446651805452502;
  const zoom = 16;

  function isMarkerInsidePolygon(marker, poly) {
    var inside = false;
    var x = marker.getLatLng().lat, y = marker.getLatLng().lng;
    for (var ii = 0; ii < poly.getLatLngs().length; ii++) {
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

  var customMarker = L.Icon.extend({
    options: {
      shadowUrl: null,
      iconAnchor: new L.Point(24, 24),
      iconSize: new L.Point(48, 48),
      iconUrl: 'https://cdn.pixabay.com/photo/2014/12/21/23/27/treasure-chest-575386_960_720.png'
    }
  });

  const estanTesorosCorrectos = (): boolean => {
    //Busca si algún tesoro no tiene url o texto. Si lo encuentra, es que los tesoros no están correctos
    return tesoros.find(t => t.hint.image_url == "" || t.hint.text == "") ? false : true;
  }
  const { postGame } = useObtener();
  async function handleCreateGame() {
    let mensaje: string = "";
    let tipo: NOTIFICATION_TYPE = "danger";

    
    if (tesoros.length == 0 || !estanTesorosCorrectos() || playArea == "" || nombre == "" || descripcion == "") {
      mensaje = "Debes añadir nombre, área y tesoros."
    }
    else {
      let areaJuego = JSON.parse(playArea);
      const jueguico = {
        name: nombre,
        description: descripcion,
        area: { coordinates: areaJuego.map((coords) => { return ({ latitude: coords[0], longitude: coords[1] }) }) },
        active: true,
        treasures: tesoros,
        winner: ""
      }
      await postGame(jueguico)
      mensaje = "Juego creado";
      tipo = "success";
      navigate('/games', {
        replace: true
      });
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
  function MyComponent() {
    const map = useMapEvents({})

    var customMarker = L.Icon.extend({
      options: {
        shadowUrl: null,
        iconAnchor: new L.Point(24, 24),
        iconSize: new L.Point(48, 48),
        iconUrl: 'https://cdn.pixabay.com/photo/2014/12/21/23/27/treasure-chest-575386_960_720.png'
      }
    });

    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    //@ts-ignore
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

    var playableArea, p1, p2, p3, p4;
    var areaLayer;


    map.addControl(drawControl);
    //@ts-ignore
    map.on(L.Draw.Event.CREATED, function (e) {
      drawnItems.addLayer(e.layer);
      if (e.layer instanceof L.Rectangle) {
        if (!playableArea) {
          p1 = "[" + e.layer.getLatLngs()[0][0]["lat"] + "," + e.layer.getLatLngs()[0][0]["lng"] + "]";
          p2 = "[" + e.layer.getLatLngs()[0][1]["lat"] + "," + e.layer.getLatLngs()[0][1]["lng"] + "]";
          p3 = "[" + e.layer.getLatLngs()[0][2]["lat"] + "," + e.layer.getLatLngs()[0][2]["lng"] + "]";
          p4 = "[" + e.layer.getLatLngs()[0][3]["lat"] + "," + e.layer.getLatLngs()[0][3]["lng"] + "]";
          playableArea = "[" + p1 + "," + p2 + "," + p3 + "," + p4 + "]";
          areaLayer = e.layer;
          setPlayArea(playableArea);
        } else {
          e.layer.remove();
        }
      }

      if (e.layer instanceof L.Marker) {
        if (playableArea) {
          if (isMarkerInsidePolygon(e.layer, areaLayer)) {
            dispatch({
              type: 'add', payload: {
                found: [], hint: {
                  image_url: "",
                  text: ""
                }, location: [e.layer.getLatLng().lat, e.layer.getLatLng().lng]
              }
            })

          } else {
            e.layer.remove();
          }
        } else {
          e.layer.remove();
        }
      }

    });
    //@ts-ignore
    map.on(L.Draw.Event.DELETED, function (e) {
      playableArea = null;
      areaLayer = null;
    });

    return null
  }

  return (
    <div>

      <h1>Crear juego</h1>
      <Grid container xs={12} display="flex">

        <MapContainer
          style={{ height: "480px", width: "100%" }}
          zoom={zoom}
          center={[centerLat, centerLong]}

          scrollWheelZoom={true}

        >
          <MyComponent />
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        </MapContainer>

        <Grid item container xs={12} padding={3} display="flex">
          <FormControl fullWidth  >
            <InputLabel htmlFor="component-simple">Nombre</InputLabel>
            <Input id="component-simple" value={nombre} onChange={handleNombreChange} />
          </FormControl>
        </Grid>
        <Grid item xs={12} padding={3}>

          <FormControl fullWidth >
            <InputLabel htmlFor="component-simple">Descripción</InputLabel>
            <Input id="component-simple" value={descripcion} onChange={handleDescripcionChange} />
          </FormControl>
        </Grid>
      </Grid>
      <br />


      <h3>Tesoros</h3>
      {tesoros && tesoros.map((t, index) => {
        return <TreasureCreate tesoro={t} i={tesoros.indexOf(t)} dispatchTesoro={dispatch} />
      })}
      <Button variant="outlined" onClick={handleCreateGame}>Crear</Button>
    </div>
  );
};
