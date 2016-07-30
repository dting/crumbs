import React from 'react';
import Moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

export const MessageListEntry = props => {
  const {username, message, createdAt} = props.message;
  return (
    <ListGroupItem>
      {`${username} ${message} ${Moment(createdAt).fromNow()}`}
    </ListGroupItem>
  );
};
