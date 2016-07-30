import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

export default props => (
  <div>
    <Link to="/users/sign-up">Don't have an account?</Link>
    <Button onClick={props.login} bsStyle="primary" disabled={props.pending}>
      Log In
    </Button>
  </div>
);
