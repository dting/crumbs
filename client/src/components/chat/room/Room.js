import React from 'react';
import { Button, Glyphicon, Grid } from 'react-bootstrap';

import { AddMessage } from './AddMessage';
import { MessageList } from './MessageList';
import s from './room.css';

import Map from '../../map/Map';
import ms from '../../map/map.css';

const ActionMarker = props => (
  <div className={ms.actionMarker}>
    <Button bsStyle="primary" onClick={props.leaveRoom} className={ms.actionButton}>
      Leave Room! <Glyphicon glyph="log-out" />
    </Button>
  </div>
);

export default props => (
  <div>
    {props.location && (
      <Map {...props}>
        <ActionMarker {...props} />
      </Map>
    )}
    <Grid className={s.room}>
      <AddMessage {...props} />
      <MessageList {...props} />
    </Grid>
  </div>
);
