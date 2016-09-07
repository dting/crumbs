import React, { Component, cloneElement } from 'react';
import { withRouter } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import 'whatwg-fetch';
import { UserForm } from '../../components/user';
import { statusCheck } from '../../utils';

import s from './account.css';

class Account extends Component {
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
  }

  componentWillMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.router.push('/');
    }
  }

  login() {
    this.setState({ pending: true });
    const { username, password } = this.state;
    const promise = fetch('/auth/local', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    promise
      .then(statusCheck)
      .then(res => res.json())
      .then(res => {
        if (!res.token) {
          throw new Error('Missing token.');
        }
        localStorage.setItem('token', res.token);
        this.props.router.push('/');
      })
      .catch(() => this.setState({ pending: false, message: 'Login error. Try again!' }));
  }

  signUp() {
    this.setState({ pending: true });
    const { username, password } = this.state;
    const promise = fetch('/api/users/sign-up', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    promise
      .then(statusCheck)
      .then(res => res.json())
      .then(res => {
        if (!res.token) {
          throw new Error('Missing token.');
        }
        localStorage.setItem('token', res.token);
        this.props.router.push('/');
      })
      .catch(() => this.setState({ pending: false, message: 'Sign up error. Try again!' }));
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
        <Jumbotron className={s.jumbo}>
          <h1>Crumbs</h1>
          <p>Authentication</p>
        </Jumbotron>
        <UserForm {...childProps} />
        {this.state.message && <div>{this.state.message}</div>}
        {this.props.children && cloneElement(this.props.children, childProps)}
      </div>
    );
  }
}

export default withRouter(Account);
