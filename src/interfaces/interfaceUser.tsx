
export interface User {
    email: string;
    rol: string;
    username: string;
    _id: string;
}

export function objectUser(): User {
    return {
        email: "",
        rol: "",
        username: "",
        _id: ""
    }
}