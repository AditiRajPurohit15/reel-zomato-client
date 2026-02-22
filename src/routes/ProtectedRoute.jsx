import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, allowedRole})=>{
    const {token, role} = useSelector((state)=>state.auth);
    if(!token){
        return <Navigate to="/login"/>
    }
    if(allowedRole && role!== allowedRole){
        return <Navigate to="/login"/>
    }
    return children;
}

export default ProtectedRoute;