import React from 'react';
import { Button, Glyphicon, Grid } from 'react-bootstrap';

import s from './roaming.css';

import Map from '../../map/Map';
import ms from '../../map/map.css';

const ActionMarker = props => (
  <div className={ms.actionMarker}>
    {props.exists ? (
      <Button bsStyle="primary" onClick={props.joinRoom} className={ms.actionButton}>
        Join Room! <Glyphicon glyph="log-in" />
      </Button>
    ) : (
      <Button bsStyle="primary" onClick={props.createRoom} className={ms.actionButton}>
        Create Room! <Glyphicon glyph="check" />
      </Button>
    )}
  </div>
);

export default props => (
  <div>
    {props.location && (
      <Map {...props}>
        <ActionMarker {...props} />
      </Map>
    )}
    <Grid className={s.roaming}>
      <p>Start or join the conversation!</p>
    </Grid>
  </div>
);
