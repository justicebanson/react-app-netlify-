import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState: {
        user: null,
    },
    reducers: {
        // register
        register: (state,action)=>{
            // console.log("Register", action.payload);
            state.user = action.payload;
        },
        //login
        login: (state,action)=> {
            // console.log("Logged in", action.payload);
            state.user = action.payload;
        },
        //logout
        logout: (state)=> {
            // console.log("Logged Out");
            state.user = null;
        },
        //pageloader
    },
});
export const {register,login,logout} = authSlice.actions;

export default authSlice.reducer;