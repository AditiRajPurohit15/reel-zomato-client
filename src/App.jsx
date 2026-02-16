import AuthInitializer from "./components/AuthInitializer";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
    <Navbar/>
    <AppRoutes/>
    <AuthInitializer/>
    </>
  );
}

export default App;
