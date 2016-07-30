import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import io from 'socket.io-client';

import { Home, Account } from './containers';
import { Roaming, Room } from './components/chat';
import { Login, SignUp } from './components/user';

const socketServerUri = process.env.SOCKET_SERVER_URI || 'http://localhost:3000';
const socket = io(socketServerUri);

const authRequired = (nextState, replace) => {
  if (localStorage.getItem('username') === null) {
    replace('/users');
  }
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={Home} onEnter={authRequired} socket={socket}>
      <IndexRedirect to="/roaming" />
      <Route path="/roaming" component={Roaming} />
      <Route path="/chat-room" component={Room} />
    </Route>
    <Route path="/users" component={Account} socket={socket}>
      <IndexRedirect to="/users/login" />
      <Route path="/users/login" component={Login} />
      <Route path="/users/sign-up" component={SignUp} />
    </Route>
  </Router>
), document.getElementById('app'));
