import React, { Component, cloneElement } from 'react';
import { withRouter } from 'react-router';
import { Col, Grid } from 'react-bootstrap';
import 'whatwg-fetch';
import Navbar from '../../components/navbar/Navbar';
import { UserForm } from '../../components/user';
import { statusCheck } from '../../utils';
import Map from '../../components/map/Map';

import s from './account.css';

const randomPosition = () => ({
  lat: Math.floor(Math.random() * 180) - 90,
  lng: Math.floor(Math.random() * 360) - 180,
});

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
    } else {
      this.setState({ position: randomPosition() });
      this.interval = setInterval(() => {
        this.setState({ position: randomPosition() });
      }, 10000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    const childProps = Object.assign({ zoom: 1 }, this.state, this.handlers);
    return (
      <div className={s.auth}>
        <Navbar />
        <Map {...childProps} />
        <Grid className={s.authForm}>
          {this.state.message && (
            <Col smOffset={2} sm={10}>
              <div className={s.authError}>{this.state.message}</div>
            </Col>
          )}
          <UserForm {...childProps}>
            {this.props.children && cloneElement(this.props.children, childProps)}
          </UserForm>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Account);
