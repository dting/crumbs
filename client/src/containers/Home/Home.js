import React, { Component, cloneElement } from 'react';
import { browserHistory } from 'react-router';
import { Jumbotron, Button } from 'react-bootstrap';

const appStyle = {
  margin: 'auto auto',
  width: '80%',
  height: '100%',
  border: '1px solid black',
  padding: '7%',
  textAlign: 'center',
  background: '#CCC',
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: null,
      location: null,
    };

    this.setPosition = this.setPosition.bind(this);
    this.handlers = {
      addMessageToChatRoom: this.addMessageToChatRoom.bind(this),
      createChatRoom: this.createChatRoom.bind(this),
      joinChatRoom: this.joinChatRoom,
    };

    this.props.route.socket.on('updateMessagesState', room => {
      this.setState({ room });
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
      this.updateMessagesState();
    }
  }

  updateMessagesState() {
    this.props.route.socket.emit('updateMessagesState', this.state.location);
  }

  addMessageToChatRoom(message) {
    this.props.route.socket.emit('addMessageToChatRoom', {
      location: this.state.location,
      message,
      username: this.state.username,
    });
  }

  createChatRoom() {
    this.props.route.socket.emit('createChatRoom', this.state.location);
  }

  joinChatRoom() {
    browserHistory.push('/chat-room');
  }

  logout() {
    localStorage.removeItem('username');
    browserHistory.push('/users');
  }

  render() {
    const childProps = Object.assign({}, this.handlers, this.state);
    return (
      <div style={appStyle}>
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
