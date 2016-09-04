import React from 'react';

export default props => (
  <div>
    <form>
      <input
        onChange={props.handleUsernameTextChange}
        value={props.username}
        type="text"
        placeholder="username"
      />
      <input
        onChange={props.handlePasswordTextChange}
        value={props.password}
        type="password"
        placeholder="password"
      />
    </form>
  </div>
);
