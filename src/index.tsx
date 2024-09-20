import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/main.routes';
import { AuthProvider } from './auth/AuthContext.js';
import { createRoot } from 'react-dom/client';
import ArticleProvider from './context/article.context.js';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ArticleProvider>
          <RouterProvider router={router}></RouterProvider>
        </ArticleProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>

);