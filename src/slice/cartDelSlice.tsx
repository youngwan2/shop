import { createSlice } from "@reduxjs/toolkit";




export const cartDelSlice = createSlice({
    name: "cartDel",
    initialState: {
        id: 0
    },
    reducers: {
        cartIdCommunicator(state, action) {
            state.id = action.payload ;
        }
    }
});

export const {cartIdCommunicator} = cartDelSlice.actions;