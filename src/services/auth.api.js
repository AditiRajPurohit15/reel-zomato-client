import api from "./api";

export const registerController = async (data)=>{
    const response = await api.post("/api/auth/register", data)
    return response.data;
}

export const loginController = async (data)=>{
    const response = await api.post("/api/auth/login",data)
    return response.data;
}

export const logoutController = async (data)=>{
    const response = await api.get("/api/auth/logout", data);
    return response.data;
}

export const loginFoodPartnerController = async (data)=>{
    const response = await api.post("/api/auth/food-partner/login", data);
    return response.data;
}

export const logoutFoodPartnerController = async(data)=>{
    const response = await api.get("/api/auth/food-partner/logout",data);
    return response.data;
}

export const registerFoodPartnerController = async(data)=>{
    const response = await api.post("/api/auth/food-partner/register",data);
    return response.data;
}