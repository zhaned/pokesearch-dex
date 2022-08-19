import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  version_group: null, //for moveset
  versions: [], //for descriptions
  generation: null, //for honestly, idk
  status: null,
};

export const getVersions = createAsyncThunk(
  "version/getVersions",
  async (generation) => {
    let versionObj = {
      generation: null,
      version_group: null,
      versions: null,
    };
    const getGeneration = await fetch(
      `https://pokeapi.co/api/v2/generation/${generation}`
    ).then((res) => res.json())
    versionObj.generation = getGeneration.id;
    versionObj.version_group = getGeneration.version_groups[0].url.slice(40).split("/").join('');
    const getVersions = await Promise.all(
      getGeneration.version_groups.flatMap((group) =>
        fetch(group.url)
          .then((res) => res.json())
      )
    );
    versionObj.versions = getVersions.flatMap((version) => version.versions.map(version => version.name))
    return versionObj;
  }
);

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
      state.versions = payload.versions;
      state.generation = payload.generation;
      state.version_group = payload.version_group;
      state.status = "success";
    },
    [getVersions.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { selection } = versionSlice.actions;

export default versionSlice.reducer;
