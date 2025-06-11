import { AxiosInstance, AxiosResponse } from "axios";

// POST
export const postRequest = async <TRequest = any, TResponse = any>(
    instance: AxiosInstance,
    url: string,
    data?: TRequest,
): Promise<TResponse> => {
    const response: AxiosResponse<TResponse> = await instance.post(url, data);
    return response.data;
};

// GET
export const getRequest = async <TResponse = any>(
    instance: AxiosInstance,
    url: string,
): Promise<TResponse> => {
    const response: AxiosResponse<TResponse> = await instance.get(url);
    return response.data;
};

// PUT
export const putRequest = async <TRequest = any, TResponse = any>(
    instance: AxiosInstance,
    url: string,
    data?: TRequest,
): Promise<TResponse> => {
    const response: AxiosResponse<TResponse> = await instance.put(url, data);
    return response.data;
};

// DELETE
export const deleteRequest = async <TResponse = any>(
    instance: AxiosInstance,
    url: string,
): Promise<TResponse> => {
    const response: AxiosResponse<TResponse> = await instance.delete(url);
    return response.data;
};

// PATCH
export const patchRequest = async <TRequest = any, TResponse = any>(
    instance: AxiosInstance,
    url: string,
    data?: TRequest,
): Promise<TResponse> => {
    const response: AxiosResponse<TResponse> = await instance.patch(url, data);
    return response.data;
};