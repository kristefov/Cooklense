// NAVBAR
import React from 'react';

import { Navbar, Nav, Container } from 'react-bootstrap';


const AppFooterBar = () => {
    // set modal display state
  
    return (
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">123-Recipes </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Copyright © 2023
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  
  export default AppFooterBar;
  