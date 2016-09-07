import React from 'react';
import { Button } from 'react-bootstrap';
import GoogleMap from 'google-map-react';
import avatar from '../../../assets/profileIcon.png';
import s from './roaming.css';

const Marker = () => (
  <div className={s.marker}>
    <img className={s.markerAvatar} src={avatar} alt="avatar" />
  </div>
);

export default props => (
  <div className={s.roaming}>
    {props.position && (
      <div className={s.map}>
        <GoogleMap center={props.position} zoom={17}>
          <Marker {...props.position} />
        </GoogleMap>
      </div>
    )}
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
  </div>
);
