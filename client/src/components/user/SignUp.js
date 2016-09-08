import React from 'react';
import { Link } from 'react-router';
import { Button, Col, FormGroup } from 'react-bootstrap';

export default props => (
  <div>
    <FormGroup>
      <Col sm={10} smOffset={2}>
        <Button onClick={props.signUp} bsStyle="primary" disabled={props.pending}>
          Sign Up
        </Button>
      </Col>
    </FormGroup>
    <FormGroup>
      <Col sm={10} smOffset={2}>
        <Link to="/users/login">Already have an account?</Link>
      </Col>
    </FormGroup>
  </div>
);
