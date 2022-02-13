
import axios from "axios";
import { getUsuarioSesion } from "../interfaces/interfaceUser";

export const useObtener = () => {
    async function getGames() {
        try {
            const servicio: string = '/game';
            const res = await axios.get(process.env.REACT_APP_BACKEND_PATH + servicio, {
                timeout: 10000,
                params: {
                    userToken: getUsuarioSesion()?.userToken
                }
            });

            return (res.data);
        }
        catch (error) {
            console.log("Ha habido un error:", error)
        }
    }

    async function getGameById(id: string) {
        try {
            const servicio: string = '/game';
            const res = await axios.get(process.env.REACT_APP_BACKEND_PATH + servicio, {
                timeout: 10000,
                params: {
                    userToken: getUsuarioSesion()?.userToken,
                    id
                }
            });
            console.log("Juego",res.data)
            return (res.data);
        }
        catch (error) {
            console.log("Ha habido un error:", error)
        }
    }

    async function reiniciarJuego(id: string) {
        try {
            const servicio: string = '/game/reset';
            const res = await axios.get(process.env.REACT_APP_BACKEND_PATH + servicio, {
                timeout: 10000,
                params: {
                    userToken: getUsuarioSesion()?.userToken,
                    id
                }
            });
            return (res.data);
        }
        catch (error) {
            console.log("Ha habido un error:", error)
        }
    }

    async function postPhoto(archivo: any) {
        try {            
            const data = new FormData();
            data.append("image", archivo);
            const path = 'https://api.imgur.com/3/image';

            const res = await axios.post(path, data, {
                headers: {
                    Authorization: `Client-ID 16ca85463abc7a9`,                   
                },
            });
            return res.data;
        }
        catch (error) {
            console.log("Ha habido un error:", error)
        }
    }

    async function getUsername(id: string) {
        try {
            const path = process.env.REACT_APP_BACKEND_PATH + '/user';
            const res = await axios.get(path, {
                params: {
                    userToken: getUsuarioSesion()?.userToken,
                    id                
                },
            });
            return res.data;
        }
        catch (error) {
            console.log("Ha habido un error:", error)
        }
    }

    async function postTreasure(data: any, id:string) {
  
        try {
            const path = process.env.REACT_APP_BACKEND_PATH + '/game/treasures/found';
            const res = await axios.post(path, data,{
                params: {
                    userToken: getUsuarioSesion()?.userToken, 
                    id          
                },                
            });            
            return res.data;
        }
        catch (error) {
            console.log("Ha habido un error:", error)
        }
    }

    async function postGame(data: any) {
  
        try {
            const path = process.env.REACT_APP_BACKEND_PATH + '/game';
            const res = await axios.post(path, data,{
                params: {
                    userToken: getUsuarioSesion()?.userToken,                           
                },                
            });            
            return res.data;
        }
        catch (error) {
            console.log("Ha habido un error:", error)
        }
    }


    return { getGames, getGameById,  postPhoto, postTreasure, getUsername, reiniciarJuego, postGame }
};
