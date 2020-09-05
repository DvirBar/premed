import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import { Provider } from 'react-redux';
import axios from 'axios'; 

axios.defaults.baseURL = 'http://10.0.0.12:5000';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.common['x-auth-token'] = `${localStorage.getItem('token')}`;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
