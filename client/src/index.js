import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <ToastProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ToastProvider>,
  document.getElementById('root')
);

