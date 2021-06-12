import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ScrollTo from 'react-scroll-into-view';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from 'reactstrap';
import Button from '../common/Button';

import logo from 'assets/images/logo.svg';

const Header = () => {
  return (
    <div className="header pt-3">
      <Navbar color="light" className="bg-transparent" expand="md">
        <NavbarBrand href="/" className="text_size-9 header_brand">
          <img src={logo} alt="logo" />
          <span className="ml-4 color-primary header_brand-bold">TICKET</span>
          <span>KINGS</span>
        </NavbarBrand>
        <Collapse isOpen={false} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="mx-3">
              <ScrollTo selector={`#aboutus`}>
                <NavLink href="#">About Us</NavLink>
              </ScrollTo>
            </NavItem>
            <NavItem className="mx-4">
              <ScrollTo selector={`#features`}>
                <NavLink href="#">Features</NavLink>
              </ScrollTo>
            </NavItem>
            <NavItem className="mx-4">
              <ScrollTo selector={`#success`}>
                <NavLink href="#">Success</NavLink>
              </ScrollTo>
            </NavItem>
            <NavItem className="mx-4">
              <ScrollTo selector={`#FAQ`}>
                <NavLink href="#">FAQ</NavLink>
              </ScrollTo>
            </NavItem>
          </Nav>
        </Collapse>
        <Nav>
          <a onClick={() => {window.location.href="/dashboard"}}>
            <Button label="Dashboard" />
          </a>
        </Nav>
      </Navbar>
    </div>
  );
};

Header.prototype = {
  onSubmitSearch: PropTypes.func.isRequired,
};

export default Header;
