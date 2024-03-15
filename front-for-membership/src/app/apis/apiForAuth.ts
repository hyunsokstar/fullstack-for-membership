import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { DataForLogin, LoginResponse, ResponseTypeForSignUp, SignUpData } from "@/types/typeForUser";

const instance = axios.create({
    baseURL: `${backendApi}/auth`,
    withCredentials: true,
});

export const apiForSignUp = async (dataForSignUp: SignUpData) => {
    try {
        const response: AxiosResponse<ResponseTypeForSignUp> = await instance.post("/signup", dataForSignUp);
        if (response.data.success) {
            console.log("Sign Up success", response.data.message);
            return response.data.user;
        } else {
            console.log("Sign Up failed", response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Sign Up error", error);
        throw error;
    }
};


export const apiForLogin = async (dataForLogin: DataForLogin): Promise<LoginResponse> => {
    try {
        const response = await instance.post('signin', dataForLogin);
        return response.data;
    } catch (error) {
        console.error('Login request failed: ', error);
        throw error;
    }
}

export const apiForLoginCheck = async (): Promise<LoginResponse> => {

    instance.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem('accessToken');
            console.log("accessToken for loginCheck: ", accessToken);

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    try {
        const response = await instance.get('loginCheck');
        return response.data;
    } catch (error) {
        console.error('Login check request failed: ', error);
        throw error;
    }
}