import { useEffect, useState } from "react";
import { getSavedFood } from "../../services/food.api";

const Saved = () => {

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const data = await getSavedFood();
        setFoods(data.foods);
      } catch (error) {
        console.log("error fetching saved food");
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading saved reels...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Saved Reels
      </h2>

      {/* EMPTY STATE */}
      {foods.length === 0 ? (
        <div className="text-center text-gray-500">
          No saved reels yet
        </div>
      ) : (

        /* GRID */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

          {foods.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-lg overflow-hidden shadow group"
            >

              <video
                src={item.video}
                className="w-full h-40 object-cover"
              />

              <div className="p-2">
                <p className="text-sm font-semibold truncate">
                  {item.name}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Saved;