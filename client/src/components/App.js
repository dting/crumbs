import React from 'react';
import { Authentication } from './Authentication';
import { Authenticated } from './Authenticated';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      location: '37.7837-122.4090',
      userLoggedIn: false,
    };
  }

  componentWillMount() {
    this.addMessageToChatRoom = this.addMessageToChatRoom.bind(this);
    this.createChatRoom = this.createChatRoom.bind(this);
    this.logOutUser = this.logOutUser.bind(this);

    setInterval(this.updateLocationState.bind(this), 500);

    this.props.socket.on('updateMessagesState', (location) => {
      const messages = location ? location.messages : null;
      this.setState({
        messages,
      });
    });

    this.props.socket.on('Authentication', (user) => {
      this.setState({
        userLoggedIn: user,
      });
    });
  }

  //will continually update our location state with our new position returned form navigator.geolocation and check if we are in chat room
  setPosition(position) {
    const latRound = position.coords.latitude.toFixed(3);
    const lonRound = position.coords.longitude.toFixed(3);
    const location = latRound.toString() + lonRound.toString();
    this.setState({
      location,
    });
    this.updateMessagesState();
  }

  //will watch our location and frequently call set position
  updateLocationState() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.error);
    } else {
      console.log('geolocation not supported');
    }
  }

  //socket request to the server to update messages state based on location state
  updateMessagesState() {
    this.props.socket.emit('updateMessagesState', this.state.location);
  }

  //socket request to the server to create a new chat room
  createChatRoom() {
    this.props.socket.emit('createChatRoom', this.state.location);
  }

  //socket request to chat room to append a new message to
  addMessageToChatRoom(message) {
    this.props.socket.emit('addMessageToChatRoom', { location: this.state.location, message, username: this.state.userLoggedIn });
  }

  logOutUser() {
    this.setState({
      userLoggedIn: false,
    });
  }

  render() {
    const loggedIn = (
      <Authenticated
        messages={this.state.messages}
        userLoggedIn={this.state.userLoggedIn}
        addMessageToChatRoom={this.addMessageToChatRoom}
        createChatRoom={this.createChatRoom}
        logOutUser={this.logOutUser}
      />
    );

    const notLoggedIn = (
      <Authentication socket={this.props.socket} />
    );

    let childToRender = !!this.state.userLoggedIn ? loggedIn : notLoggedIn;

    return (
      <div>
        {childToRender}
      </div>
    );
  }
}
