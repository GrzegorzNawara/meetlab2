import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import uuidV4 from 'uuid/v4'
//import debug from './debug'

//import registerServiceWorker from './registerServiceWorker';

if(localStorage.getItem('me')===null)
  localStorage.setItem('me',uuidV4())

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
