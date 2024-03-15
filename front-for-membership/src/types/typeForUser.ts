export interface ResponseTypeForSignUp {
    success: boolean;
    message: string;
    user: any
}

export type SignUpData = {
    email: string;
    password: string;
};

export interface DataForLogin {
    email: string;
    password: string;
}

export interface ITypeForLoginUser {
    email: string;
    id: number;
    name: string;
    password: string;
    phoneNumber: string;
}


export interface LoginResponse {
    success: boolean;
    accessToken: string;
    loginUser: ITypeForLoginUser
}

