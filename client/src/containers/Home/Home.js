import React, { Component, cloneElement } from 'react';
import { withRouter } from 'react-router';
import { Jumbotron, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import 'whatwg-fetch';

import s from './home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    const socket = io('', {
      query: `token=${localStorage.getItem('token')}`,
      transports: ['websocket'],
    });

    socket.on('unauthorized', err => {
      if (err.data.type === 'UnauthorizedError' || err.data.code === 'invalid_token') {
        localStorage.removeItem('token');
        this.props.router.push('/users');
      }
    });

    socket.on('room:joined', result => {
      if (result.location === this.state.location) {
        this.setState({ room: result.room });
        this.props.router.push('/chat-room');
      }
    });

    socket.on('room:checked', result => {
      if (result.location === this.state.location) {
        this.setState({ exists: result.exists });
      }
    });

    socket.on('room:created', result => {
      if (result.location === this.state.location) {
        this.setState({ exists: result.room });
      }
    });

    socket.on('message:added', result => {
      if (result.location === this.state.location) {
        const messages = this.state.room.messages;
        messages.push(result.message);
        this.setState({ messages });
      }
    });

    this.state = {
      room: null,
      location: null,
      socket,
    };

    this.setPosition = this.setPosition.bind(this);
    this.logout = this.logout.bind(this);
    this.handlers = {
      addMessage: this.addMessage.bind(this),
      createRoom: this.createRoom.bind(this),
      joinRoom: this.joinRoom.bind(this),
    };
  }

  componentWillMount() {
    const promise = fetch('/api/users/me', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    promise
      .then(res => res.json())
      .then(res => {
        this.setState({ user: res });
      })
      .catch(() => {
        localStorage.removeItem('token');
        this.props.router.push('/users');
      });
    // TODO: Handle navigator errors.
    navigator.geolocation.getCurrentPosition(this.setPosition);
    this.watchID = navigator.geolocation.watchPosition(this.setPosition);
  }

  componentWillUnmount() {
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
  }

  setPosition({ coords }) {
    const latRound = coords.latitude.toFixed(3);
    const lonRound = coords.longitude.toFixed(3);
    const location = latRound.toString() + lonRound.toString();
    const position = { lat: coords.latitude, lng: coords.longitude };
    if (this.state.location !== location) {
      this.setState({ location, position });
      this.props.router.push('/roaming');
      this.checkRoom();
    } else {
      this.setState({ position });
    }
  }

  addMessage(message) {
    const { location } = this.state;
    this.state.socket.emit('add:message', { location, message });
  }

  checkRoom() {
    this.state.socket.emit('check:room', this.state.location);
  }

  createRoom() {
    this.state.socket.emit('create:room', this.state.location);
  }

  joinRoom() {
    const { location } = this.state;
    this.state.socket.emit('join:room', { location });
  }

  logout() {
    localStorage.removeItem('token');
    this.props.router.push('/users');
  }

  render() {
    const childProps = Object.assign({}, this.handlers, this.state);
    return (
      <div className={s.app}>
        {this.state.user && <span className={s.userName}>{this.state.user.username}</span>}
        <Button className={s.logout} bsStyle="link" onClick={this.logout}>
          Logout
        </Button>
        <div>
          <Jumbotron className={s.jumbo}>
            <h1>Crumbs</h1>
            <p>Chat Room: {this.state.location}</p>
          </Jumbotron>
          {this.props.children && cloneElement(this.props.children, childProps)}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
