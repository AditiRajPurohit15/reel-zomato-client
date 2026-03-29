import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === "user") {
    return <Navigate to="/feed" />;
  }

  if (role === "partner") {
    return <Navigate to="/partner" />;
  }
};

export default Home;