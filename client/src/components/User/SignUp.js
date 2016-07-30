import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

export default props => (
  <div>
    <Link to="/users/login">Already have an account?</Link>
    <Button onClick={props.signUp} bsStyle="primary" disabled={props.pending}>
      Sign Up
    </Button>
  </div>
);
