import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer.js';
import { Provider } from 'react-redux';
import userReducer from './reducers/userReducer.js';

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
