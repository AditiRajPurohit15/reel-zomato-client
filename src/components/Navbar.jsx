import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { logoutController } from "../services/auth.api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state) => state.auth.role);

  const handleLogout = async () => {
    try {
      await logoutController();
    } catch (error) {
      console.log("logout api failed but continuing");
    }
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-orange-500 cursor-pointer"
      >
        ReelBite 🍔
      </h1>

      {/* NAV LINKS */}
      <div className="flex items-center gap-4">

        {role === "user" && (
          <>
            <button onClick={() => navigate("/feed")} className="text-gray-700 hover:text-orange-500">
              Feed
            </button>

            <button onClick={() => navigate("/saved")} className="text-gray-700 hover:text-orange-500">
              Saved
            </button>
          </>
        )}

        {role === "partner" && (
          <>
            <button onClick={() => navigate("/partner")} className="text-gray-700 hover:text-orange-500">
              Dashboard
            </button>

            <button onClick={() => navigate("/partner/uploadFood")} className="text-gray-700 hover:text-orange-500">
              Upload
            </button>
          </>
        )}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;