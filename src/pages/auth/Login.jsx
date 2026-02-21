import { useState } from "react";
import { loginController,
  loginFoodPartnerController
 } from "../../services/auth.api";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/authSlice";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const dispatch = useDispatch();
  const [role, setrole] = useState("user");
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const data = await loginController(formData);
      // console.log("API RESPONSE:", data);
      // dispatch(setLogin(data));
      let data;
      if(role === "user"){
        data = await loginController(formData);
        console.log("user api called");
      }else{
        data = await loginFoodPartnerController(formData);
        console.log("food partner api called");
      }
      dispatch(setLogin(data));
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4"
        >

          <h2 className="text-2xl font-semibold text-center">
            Login to continue
          </h2>

          <div className="flex bg-gray-200 rounded-lg p-1">
            <button
            type="button"
            onClick={()=>setrole("user")}
            className={`flex-1 py-2 rounded-md ${role=== "user" ? "bg-white shadow font-semibold":""}`}
            >
              User
            </button>
            <button
            type="button"
            onClick={() => setrole("partner")}
            className={`flex-1 py-2 rounded-md ${
              role === "partner"
                ? "bg-white shadow font-semibold"
                : ""
            }`}
          >
            Food Partner
          </button>
          </div>

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <button className="bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition">
            Login
          </button>

        </form>
      </AuthLayout>
  );
};


export default Login;
