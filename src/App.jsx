import { BrowserRouter } from "react-router-dom";
import AuthInitializer from "./components/AuthInitializer";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <div id="global-loader" className="hidden fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white px-4 py-2 rounded">Loading...</div>
      </div>
    <AppRoutes/>
    <AuthInitializer/>
    </BrowserRouter>
  );
}

export default App;
