import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const address = action.payload;
      state.address = address;
    },
    changeAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { addAddress, changeAddress } = addressSlice.actions;
export default addressSlice.reducer;
