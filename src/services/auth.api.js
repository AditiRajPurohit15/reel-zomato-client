import api from "./api";

export const registerController = async (data)=>{
    const response = await api.post("/api/auth/register", data)
    return response.data;
}

export const loginController = async (data)=>{
    const response = await api.post("/api/auth/login",data)
    return response.data;
}