import React, { Component, cloneElement } from 'react';
import { browserHistory } from 'react-router';
import { Jumbotron, Button } from 'react-bootstrap';
import { UserForm } from '../../components/user';

import s from './account.css';

const jumboStyle = {
  border: '1px solid black',
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handlers = {
      login: this.login.bind(this),
      signUp: this.signUp.bind(this),
      handleUsernameTextChange: this.handleUsernameTextChange.bind(this),
      handlePasswordTextChange: this.handlePasswordTextChange.bind(this),
    };

    /**
     * Socket listener to save username and redirect to home page
     *
     * TODO: Add specific message handlers for different fail cases.
     *
     * @param authUser {boolean|string} username if auth successful or false
     */
    this.props.route.socket.on('Authentication', authUser => {
      if (authUser) {
        // TODO: If real auth is implemented we would want to store a jwt token.
        localStorage.setItem('username', authUser);
        browserHistory.push('/');
      } else {
        localStorage.removeItem('username');
        browserHistory.push('/users');
      }
    });
  }

  componentWillMount() {
    if (localStorage.getItem('username') !== null) {
      browserHistory.push('/');
    }
  }

  login() {
    this.setState({ pending: true });
    const { username, password } = this.state;
    this.props.route.socket.emit('user:login', { username, password });
  }

  signUp() {
    this.setState({ pending: true });
    const { username, password } = this.state;
    this.props.route.socket.emit('user:signUp', { username, password });
  }

  handleUsernameTextChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordTextChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const childProps = Object.assign({ pending: this.state.pending }, this.handlers);
    return (
      <div className={s.auth}>
        <Jumbotron style={jumboStyle}>
          <h1>Crumbs</h1>
          <p>Authentication</p>
        </Jumbotron>
        <UserForm {...childProps}/>
        {this.props.children && cloneElement(this.props.children, childProps)}
      </div>
    );
  }
}
