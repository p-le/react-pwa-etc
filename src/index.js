import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import './paper.css';

const rootEle = document.getElementById('app');

ReactDOM.render(<App />, rootEle);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(<NextApp />, rootEle);
  });
}
