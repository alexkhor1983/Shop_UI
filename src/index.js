import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import cartReducer, {getTotals} from "./cartSlice"

const store = configureStore({
    reducer:{
        cart : cartReducer
    },
});

store.dispatch(getTotals());

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);