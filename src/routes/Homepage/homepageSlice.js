import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPokemon = createAsyncThunk('homepage/getPokemon', async () => {
  return fetch('http://localhost:3001/pokemon')
    .then((res) => res.json())
    .then((data) => data.results)
});

const homepageSlice = createSlice({
  name: 'homepage',
  initialState: {
    list: '',
    status: null,
  },
  extraReducers: {
    [getPokemon.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getPokemon.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = 'success';
    },
    [getPokemon.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default homepageSlice.reducer;