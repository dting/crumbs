import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { MessageListEntry } from './MessageListEntry';

export const MessageList = (props) => (
  <Panel style={{ fontWeight: 'bold' }} header="Chat Room messages">
    <ListGroup fill>
      {props.room && props.room.messages.map(message => (
        <MessageListEntry message={message} key={message._id} />
      )).reverse()}
    </ListGroup>
  </Panel>
);
