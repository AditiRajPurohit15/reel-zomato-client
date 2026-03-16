import { useEffect, useState } from "react";
import { getFoodForPartner } from "../../services/food.api";

const Dashboard = () => {
  const [foods, setsetFoods] = useState([]);

  useEffect(() => {
    const fetchFoodPartner = async () => {
      try {
        const data = await getFoodForPartner();
        setsetFoods(data.foodPartnerFeed);
      } catch (error) {
        console.log("error fetching partner food");
      }
    };

    fetchFoodPartner();
  }, []);

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
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* VIDEO */}
            <video
              src={item.video}
              className="w-full h-64 object-cover"
              controls
            />

            {/* TEXT INFO */}
            <div className="p-4">
              <p className="font-semibold text-lg">
                {item.name}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Dashboard;