import { useState } from "react";
import { createFood } from "../../services/food.api";

const UploadFood = () => {
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState(null);
    const [formData, setFormData] = useState({
        name:"",
        description:"",
    })
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleVideoChange = (e)=>{
        setVideo(e.target.files[0]);
    }
    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("video",video);
            await createFood(data);
            alert("Food uploaded successfully!");

            setFormData({
            name: "",
            description: ""
            });
            setVideo(null);
        } catch (error) {
            console.log(error);
            alert("Upload failed");
        }finally{
          setLoading(false);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4"
      >

        <h2 className="text-xl font-semibold text-center">
          Upload Food Reel
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-3 border rounded"
        />

        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          required
        />

        <button
  disabled={loading}
  className={`py-2 rounded text-white ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-orange-500 hover:bg-orange-600"
  }`}
>
  {loading ? "Uploading..." : "Upload"}
</button>

      </form>

    </div>
  );
}

export default UploadFood;
