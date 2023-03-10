import { createSlice, configureStore } from "@reduxjs/toolkit";
import { pageSlice } from "./slice/pageSlice";
import { cartDelSlice } from "./slice/cartDelSlice";
import { usernameSlice } from "./slice/usernameSlice";
import { InquiryPageSlice } from "./slice/InquiryPageSlice";

const categorySlice = createSlice({
  name: "product by category",
  initialState: {
    value: "",
  },
  reducers: {
    send(state, action) {
      state.value = action.payload;
    },
  },
});

export const { send } = categorySlice.actions;

export default configureStore({
  reducer: {
    category: categorySlice.reducer,
    page: pageSlice.reducer,
    cartDel: cartDelSlice.reducer,
    username: usernameSlice.reducer,
    inquiryPage : InquiryPageSlice.reducer
  },
});
