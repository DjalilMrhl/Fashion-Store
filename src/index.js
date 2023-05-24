import React from "react";
import ReactDOM from "react-dom/client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.scss";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from './Redux/Slices/authSlice.js'
import {Context} from './Context/context'


export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context>
    <Provider store={store}>
        <App />
    </Provider>
    </Context>
  </React.StrictMode>
);
