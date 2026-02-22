import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/authSlice";
import axios from '../services/api';

const AuthInitializer = ()=>{
    const dispatch = useDispatch();
    const token = useSelector((state)=>state.auth.token);
    const role = useSelector((state)=>state.auth.role);

    useEffect(()=>{
        const loadUser = async ()=>{
            try {
                const res = await axios.get("/api/profile/me")
                dispatch(setLogin({
                    user: res.data.user,
                    token: token,
                    role: role
                }))
                console.log("user restored automatically!")
            } catch (error) {
                console.log("auto restore failed")
            }
        }
        if(token){
            loadUser();
        }
    },[token])
    return null;
}

export default AuthInitializer;