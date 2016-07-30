import React from 'react';
import { AddMessage } from './AddMessage';
import { MessageList } from './MessageList';

export default props => (
  <div>
    <AddMessage {...props} />
    <MessageList {...props} />
  </div>
);
