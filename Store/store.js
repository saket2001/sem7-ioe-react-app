import { configureStore } from "@reduxjs/toolkit"
import { ownerSlice } from "./ownerSlice";

export const store = configureStore({
  reducer: {
    auth: ownerSlice.reducer,
  },
});
