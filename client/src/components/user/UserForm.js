import React from 'react';
import {
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

export default props => (
  <Form horizontal>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>
        Username
      </Col>
      <Col sm={10}>
        <FormControl
          onChange={props.handleUsernameTextChange}
          value={props.username}
          type="text"
          placeholder="Username"
        />
      </Col>
    </FormGroup>

    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>
        Password
      </Col>
      <Col sm={10}>
        <FormControl
          onChange={props.handlePasswordTextChange}
          value={props.password}
          type="password"
          placeholder="Password"
        />
      </Col>
    </FormGroup>
    {props.children}
  </Form>
);
