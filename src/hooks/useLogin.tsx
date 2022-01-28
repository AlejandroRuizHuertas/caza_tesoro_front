// localStorage.setItem(key

import axios from "axios";
import { useEffect } from "react";

export function useObtener() {

    //Función que hace el login y guarda los datos en el sessionStorage
    const getLogin = async (googleData: any) => {
        try {
            const servicio: string = '/user';
            const res = await axios.get(process.env.REACT_APP_BACKEND_PATH + servicio, {
                method: "GET",
                timeout: 10000,
                params: {
                    userToken: googleData.tokenId
                }
            });

            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("_id", res.data._id);
            sessionStorage.setItem("rol", res.data.rol);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }




    return { getLogin };
}