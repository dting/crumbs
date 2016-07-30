import React from 'react';
import { Button } from 'react-bootstrap';

const style = {
  margin: 'auto auto',
  height: '100%',
};

export default props => (
  <div style={style}>
    {!props.room && (
      <div>
        <h2>You are not in a chat room!</h2>
        <br />
        <p>
          Create a chat room at this spot to start a thread.
          Leave a message for someone else to find later!
        </p>
        <br />
        <Button bsStyle="primary" onClick={props.createChatRoom}>
          Create a New Chat Room!
        </Button>
      </div>
    )}
    {props.room && (
      <div>
        <h2>There is a chat room here!</h2>
        <br />
        <p>Add to the conversation!</p>
        <br />
        <Button bsStyle="primary" onClick={props.joinChatRoom}>
          Join Room!
        </Button>
      </div>
    )}
    <br />
    <br />
  </div>
);
