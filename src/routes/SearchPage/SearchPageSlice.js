import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPokedex = createAsyncThunk(
  'searchPage/getPokedex',
  async (dex) => {
    //https://pokeapi.co/api/v2/pokedex/
    return fetch(`https://pokeapi.co/api/v2/pokedex/${dex}`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

//fix: include sort type 
const initialState = {
  pokedex: '',
  id: '',
  status: null,
};

const searchPageSlice = createSlice({
  name: 'searchPage',
  initialState,
  reducers: {
    ascending: (state) => {
      state.pokedex.sort((a, b) => {
        return a.entry_number - b.entry_number;
      });
    },
    descending: (state) => {
      state.pokedex.sort((a, b) => {
        return b.entry_number - a.entry_number;
      });
    },
    aToZ: (state) => {
      state.pokedex.sort((a, b) =>
        a.pokemon_species.name.localeCompare(b.pokemon_species.name)
      );
    },
    zToA: (state) => {
      state.pokedex.sort((a, b) =>
        b.pokemon_species.name.localeCompare(a.pokemon_species.name)
      );
    },
  },
  extraReducers: {
    [getPokedex.pending]: (state) => {
      state.status = 'loading';
    },
    [getPokedex.fulfilled]: (state, { payload }) => {
      state.pokedex = payload.pokemon_entries;
      state.id = payload.id;
      state.status = 'success';
    },
    [getPokedex.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { ascending, descending, aToZ, zToA } = searchPageSlice.actions;
export default searchPageSlice.reducer;
