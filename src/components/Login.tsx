import axios from "axios";
import { useState } from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { useNavigate } from "react-router";
import { useObtener } from "../hooks/useLogin";

import { getUsuarioSesion, objectUser, User } from "../interfaces/interfaceUser";


function Login() {
    const { authenticate } = useObtener();
    const navigate = useNavigate();

    const handleLogin = async (googleData: any) => {
        await authenticate(googleData);
        navigate('/games', {
            replace: true
        });

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