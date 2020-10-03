import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import App from './App';

ReactDOM.render(
  <>
    <ToastContainer />
    <App />
  </>,
  document.getElementById('root'),
);
