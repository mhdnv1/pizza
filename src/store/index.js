import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./products";
import authSlice from "./authSlice";
import { api } from "./cart";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    [productsSlice.reducerPath]: productsSlice.reducer,
    auth: authSlice,
    [api.reducerPath]:api.reducer,
    cart:cartSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsSlice.middleware, api.middleware),
});

export default store;
