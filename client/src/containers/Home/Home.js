import React, { Component, cloneElement } from 'react';
import { browserHistory } from 'react-router';
import { Jumbotron, Button } from 'react-bootstrap';

import s from './home.css';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: null,
      location: null,
    };

    this.setPosition = this.setPosition.bind(this);
    this.handlers = {
      addMessage: this.addMessage.bind(this),
      createRoom: this.createRoom.bind(this),
      joinRoom: this.joinRoom.bind(this),
    };

    this.props.route.socket.on('room:joined', result => {
      if (result.location === this.state.location) {
        this.setState({ room: result.room });
        browserHistory.push('/chat-room');
      }
    });

    this.props.route.socket.on('room:checked', result => {
      if (result.location === this.state.location) {
        this.setState({ exists: result.exists });
      }
    });

    this.props.route.socket.on('room:created', result => {
      if (result.location === this.state.location) {
        this.setState({ exists: result.room });
      }
    });

    this.props.route.socket.on('message:added', result => {
      if (result.location === this.state.location) {
        const messages = this.state.room.messages;
        messages.push(result.message);
        this.setState({ messages });
      }
    });
  }

  componentWillMount() {
    this.setState({ username: localStorage.getItem('username') });
    if (!this.state.location) {
      browserHistory.push('/roaming');
    }

    // TODO: Handle navigator errors.
    navigator.geolocation.getCurrentPosition(this.setPosition);
    this.watchID = navigator.geolocation.watchPosition(this.setPosition);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  setPosition(position) {
    const latRound = position.coords.latitude.toFixed(3);
    const lonRound = position.coords.longitude.toFixed(3);
    const location = latRound.toString() + lonRound.toString();
    if (this.state.location !== location) {
      this.setState({ location });
      browserHistory.push('/roaming');
      this.checkRoom();
    }
  }

  addMessage(message) {
    const { location, username } = this.state;
    this.props.route.socket.emit('add:message', { location, message, username });
  }

  checkRoom() {
    this.props.route.socket.emit('check:room', this.state.location);
  }

  createRoom() {
    this.props.route.socket.emit('create:room', this.state.location);
  }

  joinRoom() {
    const { location, username } = this.state;
    this.props.route.socket.emit('join:room', { location, username });
  }

  logout() {
    localStorage.removeItem('username');
    browserHistory.push('/users');
  }

  render() {
    const childProps = Object.assign({}, this.handlers, this.state);
    return (
      <div className={s.app}>
        <Button style={{ float: 'right' }} bsStyle="link" onClick={this.logout}>
          Logout
        </Button>
        <div>
          <Jumbotron>
            <h1>Crumbs</h1>
            <p>Chat Room: {this.state.location}</p>
          </Jumbotron>
          {this.props.children && cloneElement(this.props.children, childProps)}
        </div>
      </div>
    );
  }
}
