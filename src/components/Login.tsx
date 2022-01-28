import axios from "axios";
import { useState } from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { objectUser, User } from "../interfaces/interfaceUser";


function Login() {
    const handleLogin = async (googleData: any) => {
        console.log(googleData);
        const servicio: string = '/user';
        try {

            const res = await axios.get(process.env.REACT_APP_BACKEND_PATH + servicio, {
                method: "GET",
                timeout: 10000,
                params: {
                    userToken: googleData.tokenId
                }
            });
            console.log("Acierto", res.data);
            setUsuario(res.data);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }

    const [usuario, setUsuario] = useState<User>();
    return (
        <div>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />
            <p>{usuario == undefined ? "" : `Bienvenido,  ${usuario.username}`}</p>
            <p>{usuario == undefined ? "" : `Su correo es:  ${usuario.email}`}</p>
            <p></p>
        </div>)
}
export default Login;