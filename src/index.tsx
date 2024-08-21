import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/main.routes';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
          </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);