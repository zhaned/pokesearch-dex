import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  version: 20,
};

export const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    selection: (state, action) => {
      state.version = action.payload;
    },
  },
});

export const { selection } = resultsSlice.actions;

export default resultsSlice.reducer;
