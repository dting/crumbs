import React, { Component, cloneElement } from 'react';
import { withRouter } from 'react-router';
import io from 'socket.io-client';
import 'whatwg-fetch';
import Navbar from '../../components/navbar/Navbar';
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
      leaveRoom: this.leaveRoom.bind(this),
      logout: this.logout.bind(this),
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
    const { location, room } = this.state;
    if (room && room.location === location) {
      this.props.router.push('/chat-room');
    } else {
      this.state.socket.emit('join:room', { location });
    }
  }

  leaveRoom() {
    this.props.router.push('/roaming');
  }

  logout() {
    localStorage.removeItem('token');
    this.props.router.push('/users');
  }

  render() {
    const childProps = Object.assign({}, this.handlers, this.state, this.state.position);
    return (
      <div className={s.home}>
        <Navbar {...childProps} />
        <div>
          {this.props.children && cloneElement(this.props.children, childProps)}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
