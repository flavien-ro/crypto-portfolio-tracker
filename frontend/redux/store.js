import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "./addressReducer.js";

export const store = configureStore({
  reducer: {
    address: addressReducer,
  },
});
