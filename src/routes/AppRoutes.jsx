import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Feed from "../pages/feed/Feed";
import Dashboard from "../pages/partner/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import UploadFood from "../pages/partner/UploadFood";
import Saved from "../pages/profile/Saved";
import Home from "../pages/Home";

const AppRoutes= ()=>{
    return(
        <>
        <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<ProtectedRoute allowedRole="user"><Feed/></ProtectedRoute>} />
            <Route path="/partner" element={<ProtectedRoute allowedRole="partner"><Dashboard/></ProtectedRoute>}/>
            <Route path="/partner/uploadFood" element={<ProtectedRoute allowedRole="partner"><UploadFood/></ProtectedRoute>}/>
            <Route path="/saved" element={<ProtectedRoute allowedRole="user"><Saved /></ProtectedRoute>}/>

        </Routes>
        </>
    )
}

export default AppRoutes;