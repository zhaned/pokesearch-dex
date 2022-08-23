import { configureStore } from '@reduxjs/toolkit';
import homepageReducer from '../routes/Homepage/homepageSlice';
import versionReducer from '../component/Results/versionSlice';
import searchPageReducer from '../routes/SearchPage/SearchPageSlice';

export const store = configureStore({
  reducer: {
    pokemon: homepageReducer,
    version: versionReducer,
    pokedex: searchPageReducer,
  },
});
