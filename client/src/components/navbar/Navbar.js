import React from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

import s from './navbar.css';

export default props => (
  <Navbar inverse className={s.navbar}>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Crumbs</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    {props.user &&
      <Navbar.Collapse>
        <Nav pullRight onSelect={props.logout}>
          <NavDropdown title={props.user.username} id="basic-nav-dropdown">
            <MenuItem eventKey="logout">Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    }
  </Navbar>
);
