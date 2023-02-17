import { createSlice } from "@reduxjs/toolkit";

export const usernameSlice = createSlice({
  name: "username",
  initialState: {
    value: "",
  },
  reducers: {
    getUsername(state, action) {
      state = action.payload;
    },
  },
});

export const { getUsername } = usernameSlice.actions;
