import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  version_group: 20, //for moveset
  versions: ['sword', 'shield'], //for descriptions
  generation: 8, //for honestly, idk
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
  //1. needs to first get generation, 
  //2. map through each version_group url
  //3. get versions for each version_group

  //4. when changed, change the version group
  //5. repeat steps 1-3
});

export const { selection } = versionSlice.actions;

export default versionSlice.reducer;
