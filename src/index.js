import React from "react";
import ReactDOM from "react-dom/client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.scss";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from './Redux/Slices/cartSlice.js'
import authReducer from './Redux/Slices/authSlice.js'
import { productsAPI } from './Redux/API/ProductsAPI'


export const store = configureStore({
  reducer: {
    [productsAPI.reducerPath]: productsAPI.reducer,
    cart: cartReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsAPI.middleware)
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);
