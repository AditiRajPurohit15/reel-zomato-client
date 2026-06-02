import api from "./api";

export const createComment = async(foodId, text)=>{
    const response = await api.post(`/api/comments/food/${foodId}`,{text});
    return response.data;
}

export const getComments = async(foodId)=>{
    const response = await api.get(`/api/comments/food/${foodId}`)
    return response.data;
}
export const getReplies = async(commentId)=>{
    const response = await api.get(`/api/comments/replies/${commentId}`)
    return response.data
}

// deleteComment()

// replyToComment()

