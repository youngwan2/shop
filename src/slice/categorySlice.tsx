import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// const asyncGetProductsByCategory = createAsyncThunk(
//     'categorySlice/ProductsByCategory' ,
//     async() =>{
//        await fetch('https://fakestoreapi.com/products/category/jewelery')
//             .then(response => console.log(response))
//     }
// )

//  export const categorySlice = createSlice({
//     name:"ProductsByCategory",
//     initialState: {
//         data : '',
//         status : ''
//     },
//     reducers: {
        
        
//     },


//     extraReducers :(builder) => {
//         builder.addCase(asyncGetProductsByCategory.pending, (state)=>{
//             state.status = '로딩중(Loading)...'
//         })

//         builder.addCase(asyncGetProductsByCategory.fulfilled, (state, action)=>{
//             state.status ='완료(Complete)!'
//             state.data = action.payload!
//         })
//         builder.addCase(asyncGetProductsByCategory.rejected, (state,action)=>{
//             state.status ='전송실패(Fail)...'
//         })

//     }
// })







