import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  generation: null, //for version groups
  version_group: null, //for moveset and versions
  versions: [], //for descriptions
  status: null,
};

export const getVersions = createAsyncThunk(
  "version/getVersions",
  async (generation) => {
    const genParse = generation.split(',');
    let versionObj = {
      generation: null,
      version_group: null,
      versions: null,
    };
    const getGeneration = await fetch(
      `https://pokeapi.co/api/v2/generation/${genParse[0]}`
    ).then((res) => res.json())
    versionObj.generation = getGeneration.id;
    versionObj.version_group = genParse[1];
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
