import { useState, useEffect } from "react";
import { registerController, registerFoodPartnerController } from "../../services/auth.api";
import AuthLayout from "./AuthLayout";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const [role, setrole] = useState("user")
    const [formData, setformData] = useState({
        fullName: "",
        businessName: "",
        contactName: "",
        phone: "",
        address: "",
        email: "",
        password: "",
    })
     useEffect(() => {
        setformData({
            fullName: "",
            businessName: "",
            contactName: "",
            phone: "",
            address: "",
            email: "",
            password: "",
        });
    }, [role]);

    const handleChange = (e)=>{
        setformData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            // const data = await registerController(formData);
            // console.log("REGISTER SUCCESS : ", data);
            // alert("regstered successfully!");
            let data;
            if(role === "user"){
                data = await registerController({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password
                });
                console.log("user api called");
            }else{
                data = await registerFoodPartnerController({
                    businessName: formData.businessName,
                    contactName: formData.contactName,
                    phone: formData.phone,
                    address: formData.address,
                    email: formData.email,
                    password: formData.password
                });
                console.log("food partner api called")
            }
            dispatch(setLogin(data));
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

        <div className="flex bg-gray-200 rounded-lg p-1">
        <button
            type="button"
            onClick={() => setrole("user")}
            className={`flex-1 py-2 rounded-md ${
              role === "user" ? "bg-white shadow font-semibold" : ""
            }`}
        >
            User
        </button>

        <button
            type="button"
            onClick={() => setrole("partner")}
            className={`flex-1 py-2 rounded-md ${
            role === "partner" ? "bg-white shadow font-semibold" : ""
            }`}
         >
            Food Partner
        </button>
        </div>

        {/* USER INPUTS */}
{role === "user" && (
  <input
    type="text"
    name="fullName"
    placeholder="Full Name"
    value={formData.fullName}
    onChange={handleChange}
    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
    required
  />
)}

{/* PARTNER INPUTS */}
{role === "partner" && (
  <>
    <input
      type="text"
      name="businessName"
      placeholder="Business Name"
      value={formData.businessName}
      onChange={handleChange}
      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
      required
    />

    <input
      type="text"
      name="contactName"
      placeholder="Contact Name"
      value={formData.contactName}
      onChange={handleChange}
      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
      required
    />

    <input
      type="text"
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handleChange}
      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
      required
    />

    <input
      type="text"
      name="address"
      placeholder="Address"
      value={formData.address}
      onChange={handleChange}
      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
      required
    />
  </>
)}
        
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
        type="password" 
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
