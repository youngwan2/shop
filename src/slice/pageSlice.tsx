import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "pageNum",
  initialState: {
    value: 1,
  },
  reducers: {
    pageMessenger(state, action) {
      state.value = action.payload;
    },
  },
});

export const { pageMessenger } = pageSlice.actions;
