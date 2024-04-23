import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import appReducer from "../redux/features/app/appSlice";
import authReducer from "../redux/features/auth/authSlice";
import contactReducer from "../redux/features/contact/contactSlice";
import errorLogReducer from "../redux/features/errorLog/errorLogSlice";


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    app: appReducer,
    auth: authReducer,
    contacts: contactReducer,
    errorLogs: errorLogReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
