import axios from "axios";
export function useLogin() {

    //Función que hace el login y guarda los datos en el sessionStorage
    const authenticate = async (googleData: any) => {
        try {            
            console.log(googleData)
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
            sessionStorage.setItem("userToken", googleData.tokenId);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }
    
    return { authenticate };
}