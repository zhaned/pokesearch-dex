import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPokedex = createAsyncThunk('searchPage/getPokedex', async () => {
  //https://pokeapi.co/api/v2/pokedex/
  return fetch(`https://pokeapi.co/api/v2/pokedex/1`)
    .then((res) => res.json())
    .then((data) => data.pokemon_entries);
});

const searchPageSlice = createSlice({
  name: 'searchPage',
  initialState: {
    pokedex: '',
    status: null,
  },
  extraReducers: {
    [getPokedex.pending]: (state) => {
      state.status = 'loading';
    },
    [getPokedex.fulfilled]: (state, { payload }) => {
      state.pokedex = payload;
      state.status = 'success';
    },
    [getPokedex.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export default searchPageSlice.reducer;