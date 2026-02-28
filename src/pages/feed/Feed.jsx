import VideoCard from "../../components/VideoCard";
import { useState, useEffect } from "react";
import { getFoodItems } from "../../services/food.api";

const Feed = () => {
  const [videos, setVideos] = useState([])
  useEffect(()=>{
    const fetchFood = async()=>{
      try {
        const data = await getFoodItems();
        setVideos(data.foodItem);
      } catch (error) {
        console.log("error in fetxhing food")
      }
    }
    fetchFood();
  },[])
 return (
  <div className="h-screen w-full flex justify-center bg-black">

    {/* FEED CONTAINER */}
    <div className="h-screen w-full max-w-md overflow-y-scroll snap-y snap-mandatory">

      {videos.map((item) => (
        <VideoCard key={item._id} video={item}/>
      ))}

    </div>

  </div>
);
}

export default Feed;
