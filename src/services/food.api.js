import api from "./api";

export const getFoodItems = async()=>{
    const response = await api.get("/api/food");
    return response.data;
}

export const createFood = async(data)=>{
    const response = await api.post("/api/food",data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });
    return response.data;
}

export const getFoodForPartner = async()=>{
    const response = await api.get("/api/food/getFood");
    return response.data;
}

export const deleteFood = async (foodId) => {
    const response = await api.delete(`/api/food/${foodId}`);
    return response.data;
};