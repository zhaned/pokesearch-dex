import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'
import aboutReducer from '../routes/About/aboutSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    about: aboutReducer,
  },
});
