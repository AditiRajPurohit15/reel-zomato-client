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