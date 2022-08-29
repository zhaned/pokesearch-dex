import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPokedex = createAsyncThunk(
  'searchPage/getPokedex',
  async (dex) => {
    //https://pokeapi.co/api/v2/pokedex/
    return fetch(`https://pokeapi.co/api/v2/pokedex/${dex}`)
      .then((res) => res.json())
      .then((data) => [
        data.id,
        data.pokemon_entries.map((item) => {
          return {
            entry_number: item.entry_number,
            name: item.pokemon_species.name,
            url: item.pokemon_species.url,
          };
        }),
      ]);
  }
);
export const getInfo = createAsyncThunk('searchPage/getInfo', async (info) => {
  //https://pokeapi.co/api/v2/pokedex/
  const limit = info === 'ability' ? 267 : 826;
  return fetch(`https://pokeapi.co/api/v2/${info}?limit=${limit}`)
    .then((res) => res.json())
    .then((data) =>
      data.results.map((item, index) => {
        return {
          index: index,
          name: item.name,
          url: item.url,
        };
      })
    );
});

//fixed: include sort type
const initialState = {
  id: '',
  sort: '',
  pokedex: null,
  info: null,
  status: null,
  infoStatus: null,
};

const searchPageSlice = createSlice({
  name: 'searchPage',
  initialState,
  reducers: {
    setSort: (state, { payload }) => {
      state.sort = payload;
    },
    ascending: (state, { payload }) => {
      if (payload === '/search') {
        state.pokedex.sort((a, b) => {
          return a.entry_number - b.entry_number;
        });
      } else {
        state.info.sort((a, b) => {
          return a.index - b.index;
        });
      }
    },
    descending: (state, { payload }) => {
      if (payload === '/search') {
        state.pokedex.sort((a, b) => {
          return b.entry_number - a.entry_number;
        });
      } else {
        state.info.sort((a, b) => {
          return b.index - a.index;
        });
      }
    },
    aToZ: (state, { payload }) => {
      if (payload === '/search') {
        state.pokedex.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        state.info.sort((a, b) => a.name.localeCompare(b.name));
      }
    },
    zToA: (state, { payload }) => {
      if (payload === '/search') {
        state.pokedex.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        state.info.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
  },
  extraReducers: {
    [getPokedex.pending]: (state) => {
      state.status = 'loading';
    },
    [getPokedex.fulfilled]: (state, { payload }) => {
      state.pokedex = payload[1];
      state.id = payload[0];
      state.status = 'success';
    },
    [getPokedex.rejected]: (state) => {
      state.status = 'failed';
    },
    [getInfo.pending]: (state) => {
      state.infoStatus = 'loading';
    },
    [getInfo.fulfilled]: (state, { payload }) => {
      state.info = payload;
      state.infoStatus = 'success';
    },
    [getInfo.rejected]: (state) => {
      state.infoStatus = 'failed';
    },
  },
});

export const { ascending, descending, aToZ, zToA, setSort } =
  searchPageSlice.actions;
export default searchPageSlice.reducer;
