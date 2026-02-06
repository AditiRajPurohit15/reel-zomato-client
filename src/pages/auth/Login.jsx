import { useState } from "react";
import { loginController } from "../../services/auth.api";

const Login = () => {
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
      const data = await loginController(formData);
      alert("Logged in successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-400 to-orange-500 items-center justify-center">
        <h1 className="text-white text-5xl font-bold">
          Welcome to ReelBite 🍔
        </h1>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4"
        >

          <h2 className="text-2xl font-semibold text-center">
            Login to continue
          </h2>

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
      </div>

    </div>
  );
};


export default Login;
