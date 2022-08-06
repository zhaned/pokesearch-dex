import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getTest = createAsyncThunk('about/getTest', async () => {
  return fetch('http://localhost:3001/pokemon')
    .then((res) => res.json())
    .then((data) => data.results);
});

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getTest.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getTest.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = 'success';
    },
    [getTest.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default aboutSlice.reducer;
