import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: { themeTitle: "light" },
  reducers: {
    toggleTheme: (state, action) => {
      state.themeTitle = action.payload;
    },
  },
});
export const { toggleTheme } = globalSlice.actions;
