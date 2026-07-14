import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currency/currencySlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});
