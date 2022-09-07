import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllPokemon = createAsyncThunk(
  'searchPage/getAllPokemon',
  async () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=898`)
      .then((res) => res.json())
      .then((data) =>
        data.results.map((item) => {
          const id = item.url.slice(34).split('/');
          return {
            entry_number: id[0],
            name: item.name,
            url: id[0],
          };
        })
      );
  }
);
export const getPokedex = createAsyncThunk(
  'searchPage/getPokedex',
  async (dex, fullList) => {
    /*
    full list is necessary because pokedex doesn't give the 
    correct name for the url (ex: aegislash won't link anywhere; 
    needs aegislash-shield, which full list will provide)
    */
    const allPokemon = fullList.getState().pokedex.allPokemon;
    return fetch(`https://pokeapi.co/api/v2/pokedex/${dex}`)
      .then((res) => res.json())
      .then((data) => [
        data.id,
        data.pokemon_entries.map((item) => {
          const url = item.pokemon_species.url.slice(42).split('/');
          return {
            entry_number: item.entry_number,
            name: allPokemon.find((obj) => obj.url === url[0]).name,
            url: url[0],
          };
        }),
      ]);
  }
);

export const getInfo = createAsyncThunk('searchPage/getInfo', async (info) => {
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
//data states set to null instead of empty arrays so loading screen can happen
const initialState = {
  id: '',
  sort: '',
  allPokemon: null,
  pokedex: null,
  info: null,
  allStatus: null,
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
    [getAllPokemon.pending]: (state) => {
      state.allStatus = 'loading';
    },
    [getAllPokemon.fulfilled]: (state, { payload }) => {
      state.allPokemon = payload;
      state.allStatus = 'success';
    },
    [getAllPokemon.rejected]: (state) => {
      state.allStatus = 'failed';
    },
  },
});

export const { ascending, descending, aToZ, zToA, setSort } =
  searchPageSlice.actions;
export default searchPageSlice.reducer;
