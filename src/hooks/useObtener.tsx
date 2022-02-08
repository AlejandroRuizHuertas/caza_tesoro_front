
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
            return (res.data);
        }
        catch (error) {
            console.log("Ha habido un error:", error)
        }
    }

    async function postPhoto(archivo: any) {
        try {
            console.log("Foto",archivo);
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

    async function getPhoto(id: string) {
        console.log("Hola");
        try {
            const path = process.env.REACT_APP_IMGUR_URL + '/gallery/t/';
            const res = await axios.get(path, {
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,                    
                },
            });
            console.log(res);
            return res.data;
        }
        catch (error) {
            console.log("Ha habido un error:", error)
        }
    }



    return { getGames, getGameById,  postPhoto, getPhoto, getUsername }
};
