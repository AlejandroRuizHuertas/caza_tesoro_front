
export interface User {
    email: string;
    rol: string;
    username: string;
    _id: string;
    userToken: string;
}

export function objectUser(): User {
    return {
        email: "",
        rol: "",
        username: "",
        _id: "",
        userToken: ""
    }
}

//Función que devuelve el usuario en la sesión. Si no hay ningún usuario en el sessionStorage, devuelve indefinido
export function getUsuarioSesion(): User | undefined {
    const username = sessionStorage.getItem("username");
    const email = sessionStorage.getItem("email");
    const _id = sessionStorage.getItem("_id");
    const rol = sessionStorage.getItem("rol");
    const userToken = sessionStorage.getItem("userToken");

    //Si hay usuario, significa que hay sesión creada y se devuelve el usuario en cuestión. Si no, se devuelve nulo
    if (username && email && _id && rol && userToken) {
        return {
            username,
            email,
            _id,
            rol,
            userToken
        };
    }
    else {
        return undefined
    }
}

//Función que comprueba si el usuario está logeado
export function isLogged(): boolean {
    const _id = sessionStorage.getItem("_id");
    return _id ? true : false;
}

export function logout():any {
    sessionStorage.clear();
}