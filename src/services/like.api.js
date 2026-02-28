import api from './api';

export const toggleLike = async (foodId)=>{
    const response = await api.post("/api/food/like", {foodId});
    return response.data;
}