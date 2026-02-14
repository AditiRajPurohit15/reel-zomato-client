import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token:localStorage.getItem("token") || null,
    role:localStorage.getItem("role") || null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setLogin(state, action){
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;

            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("role", action.payload.role)
        },
        logout(state){
            state.user = null;
            state.token = null;
            state.role = null;

            localStorage.removeItem("token")
            localStorage.removeItem("role")
        }
    }
});

export const {setLogin, logout} = authSlice.actions;
export default authSlice.reducer