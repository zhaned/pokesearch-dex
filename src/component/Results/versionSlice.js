import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generation: 1,
  version_group: 0,
  versions: [],
  // pokedex?: , might be better in search page
};

export const versionSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    selection: (state, action) => {
      state.version_group = action.payload;
    },
  },
});

export const { selection } = versionSlice.actions;

export default versionSlice.reducer;
