import axios from "axios";
import { useState } from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { useObtener } from "../hooks/useLogin";

import { getUsuarioSesion, objectUser, User } from "../interfaces/interfaceUser";


function Login() {
    const { getLogin } = useObtener();

    const handleLogin = async (googleData: any) => {
        await getLogin(googleData);

    }

    return (
        <div>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />

        </div>)
}
export default Login;