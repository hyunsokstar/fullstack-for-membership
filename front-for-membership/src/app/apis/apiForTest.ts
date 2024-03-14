import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { Post } from "@/types/typeForTest";

const instance = axios.create({
    baseURL: `${backendApi}/todos`,
    withCredentials: true,
});


// test 요청
export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://koreanjson.com/Users');
    return await response.json() as Promise<Post[]>;
};