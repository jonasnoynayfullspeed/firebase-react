import React from 'react';
import ReactDOM from 'react-dom';
import './css/base.css';
import App from './js/App';

import { Provider } from 'react-redux';
import { store } from './js/helpers/store';

window.store = store;

ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>,
    
document.getElementById('chatApp'));