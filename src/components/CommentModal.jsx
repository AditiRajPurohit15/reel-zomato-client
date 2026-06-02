import React from 'react';
import { useEffect, useState } from "react";
import { getComments } from '../services/comment.api';

const CommentModal = ({foodId, onClose}) => {
    console.log(foodId)
    const [comments, setComments] = useState([]);
    
    useEffect(()=>{
        const fetchComments = async ()=> {
        try {
            const data = await getComments(foodId);
            setComments(data.comments);
            console.log(data.comments);
        } catch (error) {
             console.log("error fetching comments");
        }
    }
    fetchComments();
    },[foodId])
  return (
  <div className="fixed inset-0 bg-white z-9999 text-black p-4">

    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">Comments</h1>

      <button
        onClick={onClose}
        className="text-2xl font-bold"
      >
        ✕
      </button>
    </div>

    <p>Total comments: {comments.length}</p>

    {comments.map((comment) => (
      <div key={comment._id}>
        <p>{comment.user.fullName}</p>
        <p>{comment.text}</p>
      </div>
    ))}
  </div>
);
}

export default CommentModal;
