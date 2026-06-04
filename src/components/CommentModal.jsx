import React from 'react';
import { useEffect, useState } from "react";
import { getComments,createComment, deleteComment } from '../services/comment.api';
import { useSelector } from "react-redux";

const CommentModal = ({foodId, onClose}) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    
    const currentUser = useSelector((state)=>state.auth.user)
    
    const fetchComments = async ()=> {
        try {
            const data = await getComments(foodId);
            setComments(data.comments);
            console.log(data.comments);
        } catch (error) {
             console.log("error fetching comments");
        }
    }

    useEffect(()=>{
     fetchComments();
    },[foodId])

    const handleSubmit = async(e)=>{
      e.preventDefault();
      if (!text.trim()) {
      return;
      }
      try {
        await createComment(foodId, text);
        await fetchComments();
        setText("");
      } catch (error) {
        console.log("Error creating comment");
        }
      
    }

    const handleDelete = async(commentId)=>{
      try {
        await deleteComment(commentId)
        await fetchComments()
      } catch (error) {
        console.log("Error in deleting comment");
      }
    }

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

        {currentUser &&
          comment.user._id === currentUser._id && (
          <button onClick={() => handleDelete(comment._id)}>
            Delete
          </button>
        )}

      </div>
    ))}


    <form onSubmit={handleSubmit}>
      <input type="text" 
      placeholder="Write a comment..."
      value={text}
      onChange={(e)=>setText(e.target.value)}
      />
      <button type="submit">post</button>
    </form>


  </div>
);
}

export default CommentModal;
