import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { AppProviders } from './Components/AppProviders/AppProviders';

import 'antd/dist/antd.css';
import './style.css';

ReactDOM.render(
  <BrowserRouter>
    <AppProviders>
      <App />
    </AppProviders>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
