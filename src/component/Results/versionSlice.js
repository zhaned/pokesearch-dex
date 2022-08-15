import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  version_group: 20, //for moveset
  versions: ["sword", "shield"], //for descriptions
  generation: 8, //for honestly, idk
  status: null,
  // pokedex?: , might be better in search page
};

export const getVersions = createAsyncThunk("version/getVersions", async () => {
  return fetch(`https://pokeapi.co/api/v2/generation/2`)
    .then((res) => res.json())
    .then((data) => data.version_groups.map((version) => version.url))
    .then((url) =>
      Promise.all(url.map((link) => fetch(link).then((res) => res.json())))
    )
    .then((results) => 
      results.flatMap((value) => value.versions.map((obj) => obj.name))
    );
});

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
  extraReducers: {
    [getVersions.pending]: (state, action) => {
      state.status = "loading";
    },
    [getVersions.fulfilled]: (state, { payload }) => {
      state.versions = payload;
      state.status = "success";
    },
    [getVersions.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { selection } = versionSlice.actions;

export default versionSlice.reducer;
