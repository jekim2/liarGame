import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/common.css';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(<App />, document.getElementById('root'));

document.getElementById('intro_loading').classList.add('lg_none');

serviceWorker.unregister();
