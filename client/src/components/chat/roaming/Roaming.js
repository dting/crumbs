import React from 'react';
import { Button } from 'react-bootstrap';

import s from './roaming.css';

export default props => (
  <div className={s.roaming}>
    {!props.exists && (
      <div>
        <h2>You are not in a chat room!</h2>
        <br />
        <p>
          Create a chat room at this spot to start a thread.
          Leave a message for someone else to find later!
        </p>
        <br />
        <Button bsStyle="primary" onClick={props.createRoom}>
          Create a New Chat Room!
        </Button>
      </div>
    )}
    {props.exists && (
      <div>
        <h2>There is a chat room here!</h2>
        <br />
        <p>Add to the conversation!</p>
        <br />
        <Button bsStyle="primary" onClick={props.joinRoom}>
          Join Room!
        </Button>
      </div>
    )}
    <br />
    <br />
  </div>
);
