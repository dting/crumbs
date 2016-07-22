import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import io from 'socket.io-client'

// let demoSocket = io('http://localhost:8000')
let mainSocket = io()

ReactDOM.render(
  <App mainSocket={mainSocket} />,
  document.getElementById('app')
);

