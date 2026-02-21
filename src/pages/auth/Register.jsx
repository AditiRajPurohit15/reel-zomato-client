import { useState } from "react";
import { registerController } from "../../services/auth.api";
import AuthLayout from "./AuthLayout";

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
    <AuthLayout>
      <form onSubmit={handleSubmit}
      className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4"
      >
         <h2 className="text-2xl font-semibold text-center">
        Create Account
        </h2>
        <input 
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        type="text" 
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        />
        
        <input 
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        />
        
        <input 
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        type="text" 
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        />
        
        <button type="submit" className="bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition ">Register</button>
      </form>
    </AuthLayout>
  );
}

export default Register;
