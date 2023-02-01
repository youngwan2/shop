import { createSlice,configureStore } from "@reduxjs/toolkit";
// import { categorySlice } from "./slice/categorySlice";



const categorySlice = createSlice({
    name:"product by category",
    initialState:{
        value:""
    },
    reducers:{
        send(state,action){
            state.value = action.payload
        }
    }
})

export const {send} = categorySlice.actions


export default configureStore({
    reducer:{
        category : categorySlice.reducer
    }
})




