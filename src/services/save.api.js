import api from './api';

export const toggleSave = async (foodId)=>{
    const response = await api.post("/api/food/save", {foodId});
    return response.data;
}