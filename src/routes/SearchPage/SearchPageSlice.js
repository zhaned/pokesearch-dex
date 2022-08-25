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

const searchPageSlice = createSlice({
  name: 'searchPage',
  initialState: {
    pokedex: '',
    id: '',
    status: null,
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

export default searchPageSlice.reducer;
