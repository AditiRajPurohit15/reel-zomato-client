import { useEffect, useRef } from "react";
const VideoCard = ({ src }) => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
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
        controls
      />

    </div>
  );
};

export default VideoCard;