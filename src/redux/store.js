import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../routes/Homepage/homepageSlice";
import versionReducer from "../component/Results/versionSlice";

export const store = configureStore({
  reducer: {
    pokemon: homepageReducer,
    version: versionReducer,
  },
});
