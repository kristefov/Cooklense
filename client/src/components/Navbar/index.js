// NAVBAR
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Modal,
  Tab,
  ThemeProvider,
} from "react-bootstrap";
import SignUpForm from "../SignupForm";
import LoginForm from "../LoginForm";
import { logout } from "../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <div>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/">
                Cooklense
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar" />
              <Navbar.Collapse className="flex-row-reverse">
                <Nav className="ml-auto d-flex">
                  <Nav.Link as={Link} to="/">
                    Search For Recipes
                  </Nav.Link>
                  {/* if user is logged in show saved books and logout */}
                  {auth.isLoggedIn ? (
                    <>
                      <Nav.Link as={Link} to="/profile">
                        Profile
                      </Nav.Link>
                      <Nav.Link as={Link} to="/week">
                        Week Plan
                      </Nav.Link>
                      <Nav.Link as={Link} to="/list">
                        Shopping List
                      </Nav.Link>
                      <Nav.Link as={Link} to="/collections">
                        Collections
                      </Nav.Link>
                      <Nav.Link onClick={() => dispatch(logout())}>
                        Logout
                      </Nav.Link>
                    </>
                  ) : (
                    <Nav.Link onClick={() => setShowModal(true)}>
                      Login/Sign Up
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Modal
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-label="signup-modal"
          >
            <Tab.Container defaultActiveKey="login">
              <Modal.Header closeButton>
                <Modal.Title id="signup-modal">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="login">
                    <LoginForm handleModalClose={() => setShowModal(false)} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="signup">
                    <SignUpForm handleModalClose={() => setShowModal(false)} />
                  </Tab.Pane>
                </Tab.Content>
              </Modal.Body>
            </Tab.Container>
          </Modal>
        </div>
      </ThemeProvider>
    </>
  );
};

export default AppNavbar;