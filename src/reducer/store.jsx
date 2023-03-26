import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "../reducer/blogSlice";

const store = configureStore({
  reducer: {
    blogSlice,
  },
});

export default store;
