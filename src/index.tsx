import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/main.routes';
import { createRoot } from 'react-dom/client';

import "./i18n";


const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      
          <RouterProvider router={router}></RouterProvider>
        
    </Provider>
  </React.StrictMode>

);