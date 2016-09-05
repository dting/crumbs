import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import { Home, Account } from './containers';
import { Roaming, Room } from './components/chat';
import { Login, SignUp } from './components/user';

const authRequired = (nextState, replace) => {
  if (localStorage.getItem('token') === null) {
    replace('/users');
  }
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={Home} onEnter={authRequired}>
      <IndexRedirect to="/roaming" />
      <Route path="/roaming" component={Roaming} />
      <Route path="/chat-room" component={Room} />
    </Route>
    <Route path="/users" component={Account}>
      <IndexRedirect to="/users/login" />
      <Route path="/users/login" component={Login} />
      <Route path="/users/sign-up" component={SignUp} />
    </Route>
  </Router>
), document.getElementById('app'));
