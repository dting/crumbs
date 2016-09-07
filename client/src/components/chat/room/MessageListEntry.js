import React from 'react';
import Moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';
import s from './room.css';

export const MessageListEntry = props => {
  const { username, message, createdAt } = props.message;
  return (
    <ListGroupItem>
      <div className={s.messageContainer}>
        <img src={require('../../../assets/profileIcon.png')}
             alt="profile"
             className={s.avatar}
        />
        <div className={s.messageContents}>
          <div className={s.titleLabel}>{message}</div>
          <div className={s.memberLabel}>{username}</div>
          <div className={s.memberLabel}>{Moment(createdAt).fromNow()}</div>
        </div>
      </div>
    </ListGroupItem>
  );
};
