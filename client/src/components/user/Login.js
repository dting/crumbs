import React from 'react';
import { Link } from 'react-router';
import { Button, Col, FormGroup } from 'react-bootstrap';

export default props => (
  <div>
    <FormGroup>
      <Col sm={10} smOffset={2}>
        <Button onClick={props.login} bsStyle="primary" disabled={props.pending}>
          Log In
        </Button>
      </Col>
    </FormGroup>
    <FormGroup>
      <Col sm={10} smOffset={2}>
        <Link to="/users/sign-up">Don't have an account?</Link>
      </Col>
    </FormGroup>
  </div>
);
