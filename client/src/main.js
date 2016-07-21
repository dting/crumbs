import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import io from 'socket.io-client'

var port = process.env.PORT || 3000;
let demoSocket = io('http://localhost:8000')
let mainSocket = io('http://localhost:' + port)

ReactDOM.render(
  <App mainSocket={mainSocket} demoSocket={demoSocket} />,
  document.getElementById('app')
);

