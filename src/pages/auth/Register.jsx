import { useState } from "react";
import { registerController } from "../../services/auth.api";

const Register = () => {
    const [formData, setformData] = useState({
        fullName: "",
        email: "",
        password: "",
    })

    const handleChange = (e)=>{
        setformData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const data = await registerController(formData);
            console.log("REGISTER SUCCESS : ", data);
            alert("regstered successfully!");
        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "registration failed!")
        }
    }

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-8 bg-gray-500">
      {/* <h2 className="text-5xl text-blue-500 ">Register</h2> */}
      <form onSubmit={handleSubmit}
      className="bg-white p-10 rounded-xl w-full max-w-md flex flex-col gap-3"
      >
        <input 
        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text" 
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        />
        
        <input 
        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        />
        
        <input 
        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text" 
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        />
        
        <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition ">Register</button>
      </form>
    </div>
  );
}

export default Register;
