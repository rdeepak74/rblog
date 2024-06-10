import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    userDate: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            // console.log(action.payload.useData);
            state.status=true;
            state.userDate=action.payload.useData;
        },
        logout:(state)=>{
            state.status=false;
            state.userDate=null;
        }
    }

});

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;