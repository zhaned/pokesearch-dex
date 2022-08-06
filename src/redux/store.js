import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'
import homepageReducer from '../routes/Homepage/homepageSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homepage: homepageReducer,
  },
});
