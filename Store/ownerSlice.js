import { createSlice } from "@reduxjs/toolkit";

export const ownerSlice = createSlice({
  name: "ownerSlice",
  initialState: {
    ownerData: {},
    isLoggedIn: false,
  },
  reducers: {
    toggleAuth: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    ownerLogout: (state) => {
      state.ownerData = {};
    },
    updateOwnerData: (state, action) => {
      state.ownerData = action.payload;
    },
  },
});

export const ownerActions = ownerSlice.actions;
