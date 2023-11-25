export interface User {
    firstname: string,
    email: string,
    password: string,
    id: number
}

export interface RegisterDto {
    firstname: string,
    email: string,
    password: string
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoggedUser {
    accessToken: string
    user: User
}