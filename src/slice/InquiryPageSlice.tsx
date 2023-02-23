import { createSlice } from "@reduxjs/toolkit";



export const InquiryPageSlice = createSlice({
    name:"setInquiryPage",
    initialState:{
        value:1
    },
    reducers: {
        setInquiryPage(state,action){
            state.value = action.payload

        }
    }
})


export let {setInquiryPage} = InquiryPageSlice.actions
