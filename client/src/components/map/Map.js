import React from 'react';
import GoogleMap from 'google-map-react';
import avatar from '../../assets/profileIcon.png';

import s from './map.css';

const PersonMarker = () => (
  <div className={s.personMarker}>
    <img className={s.markerAvatar} src={avatar} alt="avatar" />
  </div>
);

export default props => (
  <div className={s.map}>
    <GoogleMap center={props.position} zoom={props.zoom || 17}>
      {props.location && <PersonMarker {...props} />}
      {props.children}
    </GoogleMap>
    {props.location && <h3 className={s.positionHeader}>{props.location}</h3>}
  </div>
);
