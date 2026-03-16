import { useEffect, useState } from "react";
import { getFoodForPartner, deleteFood } from "../../services/food.api";
import { Trash2 } from "lucide-react";

const Dashboard = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoodPartner = async () => {
      try {
        const data = await getFoodForPartner();
        setFoods(data.foodPartnerFeed);
      } catch (error) {
        console.log("error fetching partner food");
      }
    };

    fetchFoodPartner();
  }, []);
  const handleDelete = async (foodId) => {
  try {
    console.log("deleting: ", foodId)
    await deleteFood(foodId);

    // remove deleted reel from UI instantly
    setFoods((prev) => prev.filter((food) => food._id !== foodId));
    console.log("delete food api called")

  } catch (error) {
    console.log("error deleting food");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">

      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold mb-8">
        Your Uploaded Reels
      </h2>

      {/* GRID */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">

       {foods.map((item) => (
  <div
    key={item._id}
    className="relative bg-white rounded-xl shadow-md overflow-hidden"
  >

    {/* VIDEO */}
    <video
      src={item.video}
      className="w-full h-64 object-cover"
      controls
    />

    {/* TEXT INFO */}
    <div className="p-4 flex justify-between items-start">

  <div>
    <p className="font-semibold text-lg">
      {item.name}
    </p>

    <p className="text-sm text-gray-600">
      {item.description}
    </p>
  </div>

  <button
    onClick={() => handleDelete(item._id)}
    className="text-red-500 hover:text-red-600"
  >
    <Trash2 size={18} />
  </button>

</div>

  </div>
))}

      </div>

    </div>
  );
};

export default Dashboard;