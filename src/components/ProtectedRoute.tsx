import { Navigate, useNavigate } from "react-router-dom";
import { isLogged } from "../interfaces/interfaceUser";

function RequireAuth({ children }:any){
  const authed = isLogged();
  const navigate = useNavigate();
  return authed === true
    ? children
    : <>{navigate("/")}</>
}

export default RequireAuth;