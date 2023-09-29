import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPokemon = createAsyncThunk('homepage/getPokemon', async () => {
  // API currently does not have sprites for pokemon entries above 1010
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=1017')
    .then((res) => res.json())
    .then((data) => data.results);
});

const homepageSlice = createSlice({
  name: 'homepage',
  initialState: {
    list: '',
    status: null,
  },
  extraReducers: {
    [getPokemon.pending]: (state) => {
      state.status = 'loading';
    },
    [getPokemon.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = 'success';
    },
    [getPokemon.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export default homepageSlice.reducer;
