import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { logoutController } from "../services/auth.api";

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = async()=>{
    try {
        await logoutController();
        
    } catch (error) {
        console.log("logout api failed but continuing");
    }
    dispatch(logout());
}

  return (
    <>
    <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Navbar;
