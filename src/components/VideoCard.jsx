import { useEffect, useRef, useState } from "react";
import {toggleLike} from "../services/like.api"

const VideoCard = ({ video }) => {

    const { video: src, likeCount: initialLikeCount, _id, isLiked, description,name } = video;

    const [liked, setLiked] = useState(video.isLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const containerRef = useRef(null);
    const videoRef = useRef(null);

    const handleLike = async () => {

  const previousLiked = liked;

  // Optimistic UI update
  setLiked(!liked);
  setLikeCount(prev => liked ? prev - 1 : prev + 1);

  try {
    await toggleLike(_id);
  } catch (error) {
    // revert if failed
    setLiked(previousLiked);
    setLikeCount(prev => previousLiked ? prev + 1 : prev - 1);
  }
};
    useEffect(()=>{
        const observer = new IntersectionObserver(
            (entries)=>{
                const entry = entries[0];
                if(entry.isIntersecting){
                    videoRef.current?.play();
                }else{
                    videoRef.current?.pause();
                }
            },
            {
                threshold: 0.7,
            }
        )
        if(containerRef.current){
            observer.observe(containerRef.current)
        }
        return ()=>{
            if(containerRef.current){
                observer.unobserve(containerRef.current);
            }
            observer.disconnect();
        }
    },[])
  return (
    <div 
    ref={containerRef}
    className="h-screen w-full snap-start relative bg-black">
        
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        
      />
    {/* GRADIENT OVERLAY */}
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

{/* LEFT INFO */}
<div className="absolute bottom-6 left-4 text-white z-10 max-w-[70%]">
  <p className="text-lg font-semibold">{name}</p>
  <p className="text-sm opacity-90">{description}</p>
</div>

{/* RIGHT ACTIONS */}
<div className="absolute bottom-20 right-4 flex flex-col items-center gap-2 text-white z-10">
  <button onClick={handleLike} className="text-3xl">
    {liked ? "❤️" : "🤍"}
  </button>

  <p className="text-sm">{likeCount}</p>
</div>
    </div>
  );
};

export default VideoCard;