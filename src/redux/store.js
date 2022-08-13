import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import homepageReducer from "../routes/Homepage/homepageSlice";
import versionReducer from "../component/Results/versionSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemon: homepageReducer,
    version: versionReducer,
  },
});
