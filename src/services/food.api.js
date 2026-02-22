import api from "./api";

export const getFoodItems = async()=>{
    const response = await api.get("/api/food");
    return response.data;
}