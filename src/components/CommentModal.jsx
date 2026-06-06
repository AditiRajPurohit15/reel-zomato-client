import React from 'react';
import { useEffect, useState } from "react";
import { getComments,createComment, deleteComment, replyToComment,getReplies } from '../services/comment.api';
import { useSelector } from "react-redux";

const CommentModal = ({foodId, onClose}) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState({});
    
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

    const handleReply = async(e)=>{
      e.preventDefault();
      if (!replyText.trim()) {
      return;
      }
      try {
        await replyToComment(replyingTo,replyText)
        await fetchComments();
        setReplyText("");
        setReplyingTo(null);
      } catch (error) {
        console.log("Error creating reply");
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

    const handleViewReplies = async(commentId)=>{
    try{
      const data = await getReplies(commentId)
      // console.log(data);
      setReplies(prev=>({
        ...prev,
        [commentId]:data.replies,
    }))
    
    }
    catch(error){
      console.log(error);
    }
}
useEffect(() => {
    console.log(replies);
}, [replies]);
  return (
  <div className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center">
    <div className="bg-white w-[95%] max-w-2xl h-[85vh] rounded-xl shadow-2xl flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center border-b px-5 py-4">
        <h1 className="text-2xl font-bold">
          Comments ({comments.length})
        </h1>

        <button
          onClick={onClose}
          className="text-2xl font-bold hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      {/* Comments */}
      <div className="flex-1 overflow-y-auto p-5">

        {comments.map((comment) => (
          <div
            key={comment._id}
            className="border rounded-lg p-4 mb-4 shadow-sm bg-gray-50"
          >
            <p className="font-semibold text-lg">
              {comment.user.fullName}
            </p>

            <p className="text-gray-700 mt-1 mb-3">
              {comment.text}
            </p>

            <div className="flex gap-4 text-sm font-medium mb-3">

              <button
                onClick={() => setReplyingTo(comment._id)}
                className="text-blue-600 hover:underline"
              >
                Reply
              </button>

              <button
                onClick={() => handleViewReplies(comment._id)}
                className="text-green-600 hover:underline"
              >
                View Replies
              </button>

              {currentUser &&
                comment.user._id === currentUser._id && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
            </div>

            {/* Reply Form */}
            {replyingTo === comment._id && (
              <form
                onSubmit={handleReply}
                className="flex gap-2 mb-3"
              >
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
                >
                  Reply
                </button>
              </form>
            )}

            {/* Replies */}
            {(replies[comment._id] || []).map((reply) => (
              <div
                key={reply._id}
                className="ml-8 mt-2 border-l-2 border-gray-300 pl-4"
              >
                <p className="font-semibold text-sm">
                  {reply.user.fullName}
                </p>

                <p className="text-gray-600">
                  {reply.text}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="border-t p-4 flex gap-2"
      >
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="bg-black text-white px-5 rounded-lg hover:bg-gray-800"
        >
          Post
        </button>
      </form>

    </div>
  </div>
);
}

export default CommentModal;
