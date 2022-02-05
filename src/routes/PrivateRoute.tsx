import { Navigate, useNavigate } from "react-router-dom";
import { isLogged } from "../interfaces/interfaceUser";




export const PrivateRoute = ({ children }: any) => {
  return isLogged()
    ? children
    : <Navigate to="/" />
}